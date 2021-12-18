const passport = require("passport");

module.exports = (express) => {
  const router = express.Router();

  // check to see if the user is logged in or not
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login"); // or redirect to '/signup'
  }

  // protected page
  router.get("/secret", isLoggedIn, (req, res) => {
    console.log(req.session.passport.user.id);
    res.render("secret");
  });

  // logout route
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  router.get("/loggedIn", isLoggedIn, (req, res) => {
    console.log(req.session.passport.user.id);
    console.log("hello");
    res.send(`logged in `);
  });

  //error page
  router.get("/error", (req, res) => {
    res.send("You are not logged in!");
  });

  //login route
  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/secret",
      failureRedirect: "/error",
    })
    // res.render("secret");
  );

  // signup route
  router.get("/signup", (req, res) => {
    res.render("signup");
  });

  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/login",
      failureRedirect: "/error",
    })
  );

  return router;
};
