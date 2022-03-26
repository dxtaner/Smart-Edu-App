const express = require("express");

const app = express();
const pageRoute = require("./routes/pageRoute")

// teplate engine 
app.set("view engine", "ejs");

// middleware
app.use(express.static("pulbic"))


// Routes
app.use("/",pageRoute)

const port = 3000;
app.listen(port, () => {
    console.log(`App Started ${port}`)
})