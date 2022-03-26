const express = require("express");

const app = express();

// teplate engine 
app.set("view engine", "ejs");

// middleware
app.use(express.static("pulbic"))

const port = 3000;


app.get("/", (req, res) => {
    res.status(200).render("index",{
        page_name:"index",
    })
})

app.get('/about', (req, res) => {
    res.status(200).render('about', {
        page_name: 'about',
    });
});


app.listen(port, () => {
    console.log(`App Started ${port}`)
})