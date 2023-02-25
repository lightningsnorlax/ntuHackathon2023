const express = require("express");
const app = express();

app.get('/moreInfo', (req,res) => {
    res.send("Hello World");
})