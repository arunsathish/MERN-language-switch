// IMPORT Core modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Axios = require("axios");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

// Connection to ENGLISH Database
const fastConnection = require("./connections/fast");
const fastconn = fastConnection();

// Connection to ARABIC Database
const slowConnection = require("./connections/slow");
const slowconn = slowConnection();

// i18next Language Package Initialization with Middleware
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  });

// APP CONFIGURE
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(middleware.handle(i18next));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Test Request
app.get("/api/test", (req, res) => {
  console.log(req.headers["accept-language"]);
  res.send({ message: req.t("test_message") });
});

// READ Products
app.get("/api/product", async (req, res) => {
  const lang = req.headers["accept-language"];
  var conn;

  // Change connection according to language set on the header
  if (lang === "en") {
    conn = fastconn;
  } else if (lang === "ar") {
    conn = slowconn;
  } else if (!lang || lang === undefined) {
    res.status(500).json({ message: "Language header is not set!" });
  } else {
    res.status(500).json({ message: "Invalid Language" });
  }

  // Sending Find request to Database
  try {
    const data = await fastconn.models.Product.find({});
    res.status(200).json({ message: "success", data: data });
  } catch (error) {
    res.status(500).json({ message: "Failed to load.", error: error });
  }
});

// CREATE Products
app.post("/api/product", async (req, res) => {
  const lang = req.headers["accept-language"];
  var conn;

  // Change connection according to language set on the header
  if (lang === "en") {
    conn = fastconn;
  } else if (lang === "ar") {
    conn = slowconn;
  } else if (!lang || lang === undefined || !conn || conn === undefined) {
    res.status(500).json({ message: "Language header is not set!" });
  } else {
    res.status(500).json({ message: "Invalid Language" });
  }

  // console.log(req.body['en-US'].name_en);
  // console.log(req.body['en-US'].description_en);
  // console.log(req.body['ar-BH'].name_ar);
  // console.log(req.body['ar-BH'].description_ar);

  const newProduct = new fastconn.models.Product({
    // Sending Save request to Database
    "en-US": {
      name: req.body["en-US"].name_en,
      description: req.body["en-US"].description_en,
    },
    "ar-BH": {
      name: req.body["ar-BH"].name_ar,
      description: req.body["ar-BH"].description_ar,
    },
    category: req.body.category,
    price: req.body.price,
  });
  try {
    console.log(newProduct);
    const data = await newProduct.save();
    console.log(data);
    res.status(201).send({ message: "Save sucess!", data: data });
  } catch (error) {
    res.status(500).json({ message: "Failed to save." });
  }
});

// NODE EXPRESS Server
app.listen(8080, () =>
  console.log(`RUNNING '${process.env.NODE_ENV}' ENVIRONMENT ON PORT 8080`)
);
