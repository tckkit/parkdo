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
}

module.exports = ViewRouter;
