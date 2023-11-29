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
            username: req.user.username,
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

    edit: (req, res, next) => {
        const { gameId, reviewId } = req.params;
        console.log("Received parameters:", gameId, reviewId);

        // Fetch the game and review details
        Game.findById(gameId)
            .populate('reviews') // Assuming 'reviews' is the name of the field in Game model
            .then(game => {
                const review = game.reviews.find(r => r._id.equals(reviewId));

                if (!review) {
                    return res.status(404).render('error', { error: 'Review not found' });
                }

                res.locals.review = review;
                res.locals.game = game;
                res.render('games/editReview');
            })
            .catch(err => {
                console.log(`ERROR fetching game by ID: ${err}`);
                res.status(500).render('error', { error: err });
            });
    },

    update: (req, res, next) => {
        const { reviewId, gameId } = req.params;
        const { title, review, rating } = req.body;

        Review.findByIdAndUpdate(reviewId, { title, review, rating })
            .then(updatedReview => {
                res.redirect(`/games/${gameId}`);
            })
            .catch(err => {
                console.log(`ERROR updating review by ID: ${err}`);
                res.status(500).render('error', { error: err });
            });
    },
    
    delete: (req, res, next) => {
        const { gameId, reviewId } = req.params;
    
        // Delete the review by its ID
        Review.findByIdAndDelete(reviewId)
            .then(() => {
                // Redirect to the game details page after deletion
                res.redirect(`/games/${gameId}`);
            })
            .catch(err => {
                console.log(`ERROR deleting review by ID: ${err}`);
                res.render('error', { error: err });
            });
    },
    

};
