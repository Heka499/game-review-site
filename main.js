const userController = require('./controllers/userController');

const mongoose = require('mongoose'),
    express = require('express'),
    layouts = require('express-ejs-layouts'),

    port = 3000,
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: true }));

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




app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});