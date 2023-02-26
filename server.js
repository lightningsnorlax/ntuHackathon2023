/*
    Name: Lim Yu Yang Ian
    Class: DAAA/FT/1B/02
    Admin No: 2201874
*/

const express = require("express");

const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://esmed.org/MRA/mra/search/search";

const MAX = 6;

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
  var dict = {};

  await axios
    .post(
      url,
      {
        query: query,
        dateFromYear: 2021,
        dateFromMonth: 1,
        dateFromDay: 1,
      },
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

  return dict;
}

const serveStatic = require("serve-static");

var hostname = "localhost";
var port = 3001;

var app = express();

// app.use(function (req, res, next) {
//   if (req.method != "GET") {
//     res.type(".html");
//     var msg =
//       "<html><body>This server only serves web pages with GET!</body></html>";
//     res.end(msg);
//   } else {
//     next();
//   }
// });

app.use(serveStatic(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("/public/html/index.html", { root: __dirname });
});

app.get("/body", (req, res) => {
  res.sendFile("/public/html/body.html", { root: __dirname });
});

app.get("/moreinfo", (req, res) => {
  var part = req.query.part;
  if (part) {
    res.sendFile("/public/html/moreinfo.html", { root: __dirname });
  } else {
    res.redirect("/body");
  }
});

app.post("/moreinfo", async (req, res) => {
  var part = req.query.part;
  var result = await performScraping(part);
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log("Web App Hosted at http://localhost:%s", port);
});
