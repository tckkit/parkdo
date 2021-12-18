// Express required modules
const express = require("express");
const app = express();
app.use(express.static("public"));

// Passport.js required modules
const session = require("express-session");
const setupPassport = require("./passport");
const passportRouter = require("./Routers/PassportRouter")(express);
const port = process.env.PORT || 3000;
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
setupPassport(app);
app.use("/", passportRouter);

// Handlebars required modules
const { engine } = require("express-handlebars");
// const { Passport } = require("passport");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
