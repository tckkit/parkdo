const { json } = require("body-parser");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // or redirect to '/signup'
}

class ParkingslotApiRouter {
  constructor(express, parkingslotService) {
    this.express = express;
    this.parkingslotService = parkingslotService;
  }

  router() {
    const router = this.express.Router();
    router.get("/", isLoggedIn, this.getParkingslot.bind(this));
    return router;
  }

  // GET REQUEST (individual account)
  getParkingslot(req, res) {
    let userId = req.session.passport.user;
    this.parkingslotService.read(userId).then((data) => {
      res.send(data);
    });
  }
}

module.exports = ParkingslotApiRouter;
