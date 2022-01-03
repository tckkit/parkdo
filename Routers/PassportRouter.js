const express = require("express");
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
    console.log("DETAILS", req.session.passport.user.id);
    res.render("secret");
  });

  // logout route
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  router.get("/loggedIn", isLoggedIn, (req, res) => {
    console.log(req.session.passport);
    console.log("hello");
    res.send(`logged in `);
  });

  //error page
  router.get("/error", (req, res) => {
    res.send(
      `You are not logged in! <br><a href="login" class="w-nav-link">Back to log in page</a>`
    );
  });

  //login route
  router.get("/login", (req, res) => {
    res.render("login");
  });

  // router.post(
  //   "/login",
  //   passport.authenticate("local-login", {
  //     successRedirect: "/listing",
  //     failureRedirect: "/login",
  //   })
  //   // res.render("secret");
  // );

  router.post("/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/listing");
      });
    })(req, res, next);
  });

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

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email", "public_profile"],
    })
  );

  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/listing",
      failureRedirect: "/login",
    })
  );

  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/listing",
      failureRedirect: "/login",
    })
  );

  return router;
};
