const axios = require("axios");
require("dotenv").config();
console.log(process.env);
const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
});

instance.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

module.exports = instance;
