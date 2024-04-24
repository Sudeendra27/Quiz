const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/quiz_data.json", (req, res) => {
  res.sendFile(__dirname + "/quiz_data.json");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
