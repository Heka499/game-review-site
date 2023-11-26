const userController = require('./controllers/userController'),
    gameController = require('./controllers/gameController');

const mongoose = require('mongoose'),
    express = require('express'),
    layouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    connectFlash = require('connect-flash'),
    passport = require('passport'),
    port = 3000,
    app = express(),
    router = express.Router(),
    User = require('./models/user'),
    bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.use(cookieParser('gameReviewSite85'));
router.use(expressSession({
    secret: 'gameReviewSite85',
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());
app.use(layouts);

mongoose.connect(
    'mongodb://127.0.0.1:27017/game-review-db'
);
const db = mongoose.connection;
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

app.set('view engine', 'ejs');
app.use("/", router);

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate);
router.get("/users/logout", userController.logout, userController.redirectView);

router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.newUser);
router.post("/users/create", userController.create, userController.redirectView);
router.get("/users/:id", userController.show);

router.get("/games", gameController.index);
router.get("/games/new", gameController.newGame);
router.post("/games/create", gameController.create, gameController.redirectView);
router.get("/games/:id", gameController.show);

router.use(methodOverride('_method', {methods: ['POST', 'GET']}));
router.get("/users/:id/edit", userController.edit);
router.put("/users/:id/update", userController.update, userController.redirectView);
router.delete("/users/:id/delete", userController.delete, userController.redirectView);

router.get("/games/:id/edit", gameController.edit);
router.put("/games/:id/update", gameController.update, gameController.redirectView);
router.delete("/games/:id/delete", gameController.delete, gameController.redirectView);


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});