/*
    Name: Lim Yu Yang Ian
    Class: DAAA/FT/1B/02
    Admin No: 2201874
*/

const express = require("express");

const cheerio = require("cheerio")
const axios = require("axios")

const url = "https://esmed.org/MRA/mra/search/search"

async function performScraping(query) {
  // downloading the target web page
  // by performing an HTTP GET request in Axios

  axios.post(url, {query: "brain"}).then((axiosResponse) => {

    console.log(axiosResponse.data)
    const $ = cheerio.load(axiosResponse.data)
    var list = []
    console.log($(".search-results").text())
    $(".search-results").find(".media-heading a").each((index, element) => {
      list.push($(element).attr("href"))
    })
    // $(".search-results").each((i,x) => {
    //   console.log($(x).text())
    // })
    console.log(list)
    // const htmlElement = $('.media-heading a').map((i, x) => $(x).attr('href')).toArray()
    // console.log(htmlElement)
  })

}


const serveStatic = require("serve-static");

var hostname = "localhost";
var port = 3001;

var app = express();

app.use(function (req, res, next) {
  if (req.method != "GET") {
    res.type(".html");
    var msg =
      "<html><body>This server only serves web pages with GET!</body></html>";
    res.end(msg);
  } else {
    next();
  }
});

app.use(serveStatic(__dirname + "/public"));
performScraping("brain")

app.get("/", (req, res) => {
  // console.log(axiosResponse.data)
  res.sendFile("/public/html/index.html", { root: __dirname });
});

app.get("/moreinfo", (req, res) => {
    res.sendFile("/public/html/moreinfo.html", { root: __dirname });
  });

app.listen(port, () => {
  console.log("Web App Hosted at http://localhost:%s", port);
});


// kaleb shit testing
// Define route for fetching JSON data
// app.get('/data', async (req, res) => {
//   try {
//     const response = await axios.get('./public/static/medical_spider.json');
//     const data = response.data;
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });