
const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors())

app.get("/screenshots/:display/:texts", async (req, res) => {

    const display = req.params.display
    const texts = req.params.texts
    const url = `http://localhost:3000/?texts=${texts}&display=${display}`

    const browser = await puppeteer.launch(); const page = await browser.newPage();
    await page.goto(url); // URL is given by the "user" (your client-side application)
    await page.setViewport({ width: 1300, height: 512 });
    console.log(url)

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

app.listen(4000);
