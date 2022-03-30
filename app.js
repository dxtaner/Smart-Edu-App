const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require("./routes/pageRoute")
const courseRoute = require("./routes/courseRoute")
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const app = express();


mongoose.connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
}).then(() => {
    console.log("DB connect succesfully")
});

// template engine 
app.set("view engine", "ejs");

// global variable 
global.userIN = null;

// middleware
app.use(express.static("pulbic"))
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded
app.use(
    session({
        secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
    })
);

// Routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use("/", pageRoute)
app.use("/courses", courseRoute)
app.use("/categories", categoryRoute)
app.use("/users", userRoute)

const port = 3000;
app.listen(port, () => {
    console.log(`App Started ${port}`)
})