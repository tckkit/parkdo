const { json } = require("body-parser");

class ViewRouter {
  constructor(express, orderService, app) {
    this.express = express;
    this.orderService = orderService;
    this.app = app;
  }

  router() {
    const router = this.express.Router();
    // router.get("", this.getError.bind(this));
    router.get("/", this.getHome.bind(this));
    router.get("/login", this.getLogin.bind(this));
    router.get("/signup", this.getSignUp.bind(this));
    router.get("/history", this.getHistory.bind(this));
    router.get("/contactus", this.getContactUs.bind(this));
    router.get("/renter-registration", this.getRenterReg.bind(this));
    router.get("/parkingslot", this.getListing.bind(this));
    router.get("/account", this.getAccount.bind(this));
    router.get("/manage", this.getManage.bind(this));
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
  getSignUp(req, res) {
    res.render("signup"); // TBC
  }
  // getHistory(req, res) {
  //   res.render("history", JSON.parse(history));
  //   console.log(history);
  // }
  async getHistory(req, res) {
    try {
      await this.app.$get("/api/v1/all/history").done(function (data) {
        console.log("hello");
        console.log(data);
      });
      // res.render("history", JSON.parse(history));
      // console.log(history);
    } catch {
      console.log("error");
    }
  }
  //   $.get("/api/v1/all/history").done(function (data){
  //     console.log("hello");
  //     console.log(data);
  // })

  getContactUs(req, res) {
    res.render("index"); // TBC
  }
  getRenterReg(req, res) {
    res.render("renter-registration");
  }
  getListing(req, res) {
    res.render("parkingslot");
  }
  getAccount(req, res) {
    res.render("account");
  }
  getManage(req, res) {
    res.render("manage");
  }
}

module.exports = ViewRouter;
