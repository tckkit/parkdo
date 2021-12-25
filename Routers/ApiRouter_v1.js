const { json } = require("body-parser");

class ApiRouter {
  constructor(express, orderService) {
    this.express = express;
    this.orderService = orderService;
  }

  router() {
    const router = this.express.Router();
    router.get("/all/history", this.getAllHistory.bind(this));
    return router;
  }

  getAllHistory(req, res) {
    this.orderService.readAll().then((data) => {
      res.send(data);
    });
  }
}

module.exports = ApiRouter;
