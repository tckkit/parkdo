// Import all required modules
const express = require("express");
const app = express();
app.use(express.static("public"));

// Handlebars
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log(`Listening on 3000`);
});
