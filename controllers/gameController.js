const Game = require('../models/game');

module.exports = {
    index: (req, res) => {
        Game.find({})
            .then(games => {
                res.locals.games = games;
                res.render('games/index');
            })
            .catch(err => {
                console.log(`ERROR fetching games: ${err}`);
                res.render('error', { error: err });
            });
    },

    newGame: (req, res) => {
        res.render('games/new');
    },

    create: (req, res, next) => {
        console.log(req.body);
        Game.create({
            title: req.body.title,
            publisher: req.body.publisher,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate
        })
            .then(game => {
                res.locals.redirect = '/games';
                res.locals.game = game;
                next();
            })
            .catch(err => {
                console.log(`ERROR saving game: ${err}`);
                res.render('error', { error: err });
            });
    },

    show: (req, res ,next) => {
        let gameId = req.params.id;
        Game.findById(gameId)
            .populate('reviews')
            .then(game => {
                let averageRating = 0;
                if (game.reviews.length > 0) {
                    let sum = 0;
                    game.reviews.forEach(review => {
                        sum += review.rating;
                    });
                    averageRating = sum / game.reviews.length;
                }

                res.locals.game = game;
                res.locals.averageRating = averageRating;
                res.render('games/show');
            })
            .catch(err => {
                console.log(`ERROR fetching game by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    edit: (req, res, next) => {
        let gameId = req.params.id;
        Game.findById(gameId)
            .then(game => {
                res.render('games/edit', { game: game });
            })
            .catch(err => {
                console.log(`ERROR fetching game by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

    update: (req, res, next) => {
        let gameId = req.params.id;
        let updatedGame = {
            title: req.body.title,
            publisher: req.body.publisher,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate
        };
        Game.findByIdAndUpdate(gameId, { $set: updatedGame })
            .then(game => {
                res.locals.redirect = `/games/${gameId}`;
                res.locals.game = game;
                next();
            })
            .catch(err => {
                console.log(`ERROR updating game by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

    delete: (req, res, next) => {
        let gameId = req.params.id;
        Game.findByIdAndDelete(gameId)
            .then(() => {
                res.locals.redirect = '/games';
                next();
            })
            .catch(err => {
                console.log(`ERROR deleting game by ID: ${err}`);
                res.render('error', { error: err });
            });
    }

}
