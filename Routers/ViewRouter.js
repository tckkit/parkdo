const { json } = require("body-parser");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // or redirect to '/signup'
}

class ViewRouter {
  constructor(express, orderService) {
    this.express = express;
    this.orderService = orderService;
  }

  router() {
    const router = this.express.Router();
    // router.get("", this.getError.bind(this));
    router.get("/", this.getHome.bind(this));
    router.get("/login", this.getLogin.bind(this));
    router.get("/carpark-login", this.getCarparkLogin.bind(this));
    router.get("/signup", this.getSignUp.bind(this));
    router.get("/history", isLoggedIn, this.getHistory.bind(this));
    router.get("/contactus", this.getContactUs.bind(this));
    router.get(
      "/renter-registration",
      isLoggedIn,
      this.getRenterReg.bind(this)
    );
    router.get("/listing", this.getListing.bind(this));
    router.get("/account", isLoggedIn, this.getAccount.bind(this));
    router.get("/parkingslot", isLoggedIn, this.getManage.bind(this));
    return router;
  }

  getError(req, res) {
    res.send("404 Not Found");
  }
  getHome(req, res) {
    res.render("index");
  }
  getLogin(req, res) {
    res.render("login");
  }
  getCarparkLogin(req, res) {
    res.render("carpark-login");
  }
  getSignUp(req, res) {
    res.render("signup"); // TBC
  }
  getHistory(req, res) {
    res.render("history");
  }
  getContactUs(req, res) {
    res.render("index"); // TBC
  }
  getRenterReg(req, res) {
    res.render("renter-registration");
  }
  getListing(req, res) {
    res.render("listing");
  }
  getAccount(req, res) {
    res.render("account");
  }
  getManage(req, res) {
    res.render("parkingslot");
  }
}

module.exports = ViewRouter;
