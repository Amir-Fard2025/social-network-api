const express = require("express");
// const db = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
