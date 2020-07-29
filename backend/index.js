var http = require("http")
var express = require("express")
var app = express()
var path = require("path")
const PORT = 3000;
var hbs = require('express-handlebars');
var context = require("./data/services.json")
var context2 = require("./data/furniture.json")
const nodemailer = require("nodemailer");

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs');

app.get("/", function (req, res) {
    res.render('view1.hbs', { context });
})
app.get("/furniture", function (req, res) {
    res.render('view3.hbs', { layout: "notMain.hbs", context2 });
})

app.get("/services", function (req, res) {
    res.render('view2.hbs', { layout: "notMain.hbs", context });
})

app.get("/contact", function (req, res) {
    res.render('view4.hbs', { layout: "notMain.hbs", context });
})

app.post("/formSent", function (req, res) {
    console.log("!")
    let allData = ""
    req.on("data", function (data) {
        allData += data
    })
    req.on("end", function () {
        allData = JSON.parse(allData)
        console.log(allData)
        let everythingIsOk = true
        if (allData.tel.length != 9) {
            everythingIsOk = false
        }
        const email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        if (email.test(allData.email) == false) {
            everythingIsOk = false
        }
        if (everythingIsOk == true) {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "", // generated ethereal user
                    pass: "", // generated ethereal password
                },
            });
            let info = transporter.sendMail({
                from: '"Mikolaj Stryczek" <nikord16@gmail.com>', // sender address
                to: "dekitep724@romails.net", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });
            setTimeout(function () {
                console.log("===========")
                console.log(info)
            }, 4000)
            res.send(JSON.stringify("OK"))
        }
        else {
            res.send(JSON.stringify("Something went wrong"))
        }
    })
})

app.use(express.static('static'))


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})