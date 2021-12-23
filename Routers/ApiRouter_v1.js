const { json } = require("body-parser");

class ApiRouter {
  constructor(express, orderService) {
    this.express = express;
    this.orderService = orderService;
  }

  router() {
    const router = this.express.Router();
    // router.get("", this.getError.bind(this));
    router.get("/3/history", this.getAllHistory.bind(this)); //:param = account.id
    router.get("/all/history"), this.getUserHistory.bind(this);
    return router;
  }

  getError(req, res) {
    res.send("404 Not Found");
  }
  getAllHistory(req, res) {
    this.orderService.readAll().then((data) => {
      res.send(data);
    });
  }
  getUserHistory(req, res) {
    this.orderService.readUser(3).then((data) => {
      res.send(data);
    });
  }
}

module.exports = ApiRouter;
