const Review = require('../models/review');
const Game = require('../models/game');

module.exports = {
    create: (req, res, next) => {
        const { title, review, rating, gameId } = req.body;
        console.log("Received parameters:", title, review, rating, gameId);

        // Create a new review instance
        const newReview = new Review({
            title,
            review,
            rating,
            user: req.user._id, // Assuming you have user authentication
            game: gameId,
        });

        console.log("New review:", newReview);

        // Save the review to the database
        newReview.save()
            .then(savedReview => {
                // Update the game document with the new review ID
                return Game.findByIdAndUpdate(gameId, { $push: { reviews: savedReview._id } });
            })
            .then(() => {
                res.locals.redirect = '/games/' + gameId; // Redirect to the game details page
                res.locals.review = newReview;
                next();
            })
            .catch(err => {
                console.log(`ERROR saving review: ${err}`);
                res.render('error', { error: err });
            });
    },

    newReview: (req, res) => {
        console.log(req.params.id);
        const gameId = req.params.id;
        Game.findById(gameId)
            .then(game => {
                console.log("Game:", game);
                res.locals.game = game;
                res.render('games/newReview');
            })
            .catch(err => {
                console.log(`ERROR fetching game by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

};
