function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // or redirect to '/signup'
}

class ListingRouter {
  constructor(express, listingservice) {
    this.express = express;
    this.listingservice = listingservice;
  }

  router() {
    let router = this.express.Router();

    router.post("/", isLoggedIn, this.post.bind(this));
    router.get("/", isLoggedIn, this.getActive.bind(this));
    return router;
  }

  post(req, res) {
    // console.log(req.body);
    // console.log(
    // `Posting StartTime:${req.body.starttime},  EndTime:${req.body.endtime} AT ${req.body.location}`
    // );
    return this.listingservice
      .list(req.body.starttime, req.body.endtime, req.body.location)
      .then((data) => {
        // console.log("checking data", data);
        res.render("listing", { output: data });
      })
      .catch((err) => res.status(500).json(err));
  }

  getActive(req, res) {
    // let userId = req.session.passport.user;
    this.listingservice.readActive().then((data) => {
      res.render("listing", { output: data });
      // res.send(data);
    });
  }
}

module.exports = ListingRouter;
