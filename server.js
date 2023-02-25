/*
    Name: Lim Yu Yang Ian
    Class: DAAA/FT/1B/02
    Admin No: 2201874
*/

const express = require("express");

const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://esmed.org/MRA/mra/search/search";

const MAX = 10;

async function summarize(data) {
  var summary;
  await axios
    .post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      data,
      {
        headers: {
          Authorization: "Bearer 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",
        },
      }
    )
    .then(async (response) => {
      summary = response.data[0]["summary_text"];
    });

  return summary;
}

async function performScraping(query) {
  // downloading the target web page
  // by performing an HTTP GET request in Axios
  var dict = {};

  await axios
    .post(
      url,
      { query: query },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then(async (axiosResponse) => {
      const $ = cheerio.load(axiosResponse.data);
      $(".search-results")
        .find(".media-heading a")
        .each(async (index, element) => {
          if (index < MAX) {
            dict[$(element).attr("href")] = {
              title: $(element).text().trim(),
            };
          }
        });
    });

  for await (var link of Object.keys(dict)) {
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(async (response) => {
        const $ = cheerio.load(response.data);
        await summarize({
          inputs: $(".article-abstract > p").text().trim(),
        }).then((response) => {
          dict[link] = {
            title: dict[link]["title"],
            summary: response,
            abstract: $(".article-abstract > p").text().trim(),
            datePublished: $(".date-published").text().trim().split("\n")[1],
          };
        });
      });
  }
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
performScraping("brain");

app.get("/", (req, res) => {
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
