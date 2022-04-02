const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override")
const pageRoute = require("./routes/pageRoute")
const courseRoute = require("./routes/courseRoute")
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const app = express();


mongoose.connect('mongodb+srv://taner:oQTcm6JSJ7qN1ZMJ@cluster0.pytif.mongodb.net/smartedu-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log("DB connect succesfully")
});

// template engine 
app.set('view engine', 'ejs');

// global variable 
global.userIN = null;

// middleware
app.use(express.static('public'))
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded
app.use(
    session({
        secret: 'my_keyboard_cat', 
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App Started ${port}`)
})