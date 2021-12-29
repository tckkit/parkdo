const { json } = require("body-parser");

class ListingRouter {
  constructor(express, listingService) {
    this.express = express;
    this.listingService = listingService;
  }

  router() {
    const router = this.express.Router();
    router.get("/", isLoggedIn, this.getAccount.bind(this));
    return router;
  }

  // GET REQUEST (individual account)
  getAccount(req, res) {
    let userId = req.session.passport.user;
    this.accountService.read(userId).then((data) => {
      res.send(data);
    });
  }
}

module.exports = ListingRouter;
