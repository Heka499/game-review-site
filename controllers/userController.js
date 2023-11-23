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
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                res.locals.redirect = '/users';
                res.locals.user = user;
                next();
            })
            .catch(err => {
                console.log(`ERROR saving user: ${err}`);
                res.render('error', { error: err });
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
    }

};
