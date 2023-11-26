const passport = require('passport');
const User = require('../models/user');

module.exports = {
    index: (req, res) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                res.render('users/index');
            })
            .catch(err => {
                console.log(`ERROR fetching users: ${err}`);
                res.render('error', { error: err });
            });
    },

    newUser: (req, res) => {
        res.render('users/new');
    },

    indexView: (req, res) => {
        res.render('users/index');
    },

    create: (req, res, next) => {
        console.log(req.body);
        if (req.skip) next();

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        User.register(newUser, req.body.password, (err, user) => {
            if (user) {
                req.flash('success', `${user.username}'s account created successfully!`);
                res.locals.redirect = '/users';
                next();
            } else {
                req.flash('error', `Failed to create user account because: ${err.message}.`);
                res.locals.redirect = '/users/new';
                next();
            }
        });
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                res.render('users/show');
            })
            .catch(err => {
                console.log(`ERROR fetching user by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render('users/edit', { user: user });
            })
            .catch(err => {
                console.log(`ERROR fetching user by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

    update: (req, res, next) => {
        let userId = req.params.id;
        let updatedUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        User.findByIdAndUpdate(userId, { $set: updatedUser })
            .then(user => {
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user;
                next();
            })
            .catch(err => {
                console.log(`ERROR updating user by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = '/users';
                next();
            })
            .catch(err => {
                console.log(`ERROR deleting user by ID: ${err}`);
                res.render('error', { error: err });
            });
    },

    login: (req, res) => {
        res.render('users/login');
    },

    authenticate: passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: 'Failed to login.',
        successRedirect: '/users',
        successFlash: 'Logged in!'
    }),

    logout: (req, res, next) => {
        req.logout(err => {
            if (err) {
                console.error(err);
                return next(err);
            }
            req.flash('success', 'You have been logged out!');
            res.locals.redirect = '/users';
            next();
        });
    }
    

};
