const { json } = require("body-parser");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // or redirect to '/signup'
}

class AccountApiRouter {
  constructor(express, accountService) {
    this.express = express;
    this.accountService = accountService;
  }

  router() {
    const router = this.express.Router();
    router.get("/", isLoggedIn, this.getAccount.bind(this));
    return router;
  }

  // GET REQUEST (individual account)
  getAccount(req, res) {
    let userId = req.session.passport.user;
    //console.log(`userId: ${userId} GET account details`);
    this.accountService.read(userId).then((data) => {
      res.send(data);
    });
  }
}

module.exports = AccountApiRouter;
