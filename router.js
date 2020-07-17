
const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.get("/screenshots/:display/:event", async (req, res) => {

    const display = req.params.display
    const event = req.params.event
    // const url = `http://localhost:3000/?event=${event}&display=${display}`
    const url = 'http://prepnetworkgraphics.surge.sh/'

    const browser = await puppeteer.launch({
    'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
    });
    const page = await browser.newPage();
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

router.get('/', (req, res) => res.json({ answer: 42 }));

module.exports = router;
