const userController = require('./controllers/userController'),
    gameController = require('./controllers/gameController');

const mongoose = require('mongoose'),
    express = require('express'),
    layouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    port = 3000,
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(
    'mongodb://127.0.0.1:27017/game-review-db'
);
const db = mongoose.connection;
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

app.set('view engine', 'ejs');
app.use(layouts);
app.use("/", router);

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