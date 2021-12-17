const passport = require("passport");

module.exports = (express) => {
  const router = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login"); // or redirect to '/signup'
  }

  router.get("/secret", isLoggedIn, (req, res) => {
    res.send("Here you go, a secret");
  });

  router.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
  });

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/error",
    })
  );

  router.get("/error", (req, res) => {
    res.send("You are not logged in!");
  });

  router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  return router;
};
