class ViewRouter {
  constructor(express, orderService) {
    this.express = express;
    this.orderService = orderService;
  }

  router() {
    const router = this.express.Router();
    router.get("/", this.getHome.bind(this));
    router.get("/login", this.getLogin.bind(this));
    router.get("/signup", this.getSignUp.bind(this));
    router.get("/history", this.getHistory.bind(this));
    router.get("/contactus", this.getContactUs.bind(this));
    router.get("/renter-registration.html", this.getRenterReg.bind(this));
    router.get("/parkingslot.html", this.getListing.bind(this));
    router.get("/account.html", this.getAccount.bind(this));
    return router;
  }

  getHome(req, res) {
    res.render("index");
  }
  getLogin(req, res) {
    res.render("login");
  }
  getSignUp(req, res) {
    res.render("index"); // TBC
  }
  getHistory(req, res) {
    this.orderService.read().then((data) => {
      res.render("historicalOrders", JSON.parse(data));
    });
  }
  getContactUs(req, res) {
    res.render("index"); // TBC
  }
  getRenterReg(req, res) {
    res.render("renter-registration"); // TBC
  }
  getListing(req, res) {
    res.render("parkingslot"); // TBC
  }
  getAccount(req, res) {
    res.render("account"); // TBC
  }
}

module.exports = ViewRouter;
