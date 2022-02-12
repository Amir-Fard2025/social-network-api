const express = require("express");
const routes = require("./controllers");
const conn = require("./config/connection");

// put express in a constant to call it later
const app = express();

// define the port for local host
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

conn.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
});
