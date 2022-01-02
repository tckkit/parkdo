const { json } = require("body-parser");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // or redirect to '/signup'
}

class ParkingslotRouter {
  constructor(express, parkingslotService) {
    this.express = express;
    this.parkingslotService = parkingslotService;
  }

  router() {
    const router = this.express.Router();
    router.get("/", isLoggedIn, this.getAllSlots.bind(this));
    router.get("/:id", isLoggedIn, this.getSlot.bind(this));
    return router;
  }

  getAllSlots(req, res) {
    res.render("parkingslot");
  }

  getSlot(req, res) {
    let paramId = req.params.id;
    let parkingslotId = parseInt(paramId);
    let userId = req.session.passport.user;
    this.parkingslotService
      .readparkingslot(userId, parkingslotId)
      .then((data) => {
        res.render("parkingslot", data[0]);
      });
  }

  //   getSlot(req, res) {
  //     let paramId = req.params.id;
  //     let id = parseInt(paramId);
  //     let userId = req.session.passport.user;
  //     this.parkingslotService.read(userId).then((rows) => {
  //       res.send(rows[id]);
  //     });
  //   }
}

module.exports = ParkingslotRouter;
