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
    }

};
