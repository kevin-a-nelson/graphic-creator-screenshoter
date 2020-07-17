
const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get("/screenshots/:display/:texts", async (req, res) => {

    const display = req.params.display
    const texts = req.params.texts
    const url = `http://localhost:3000/?texts=${texts}&display=${display}`

    const browser = await puppeteer.launch(); const page = await browser.newPage();
    await page.goto(url); // URL is given by the "user" (your client-side application)
    await page.setViewport({ width: 1300, height: 512 });

    const screenshotBuffer = await page.screenshot({
        encoding: 'base64',
        type: 'png',
        clip: {
            x: 266,
            y: 0,
            width: 1024,
            height: 512,
        }
    });
    
    await browser.close();
    res.json({
        "ImageString": screenshotBuffer
    })
})

app.get('/', (req, res) => res.json({ answer: 42 }));

app.listen(process.env.PORT || 4000);
