class AvailabilityRouter {
  constructor(express, availabilityService) {
    this.express = express;
    this.availabilityService = availabilityService;
  }

  router() {
    let router = this.express.Router();
    router.get("/", this.getAll.bind(this));
    router.get("/active", this.getActive.bind(this));
    router.get("/:id", this.get.bind(this));
    router.post("/:id", this.post.bind(this));
    router.put("/avalability/:id", this.put.bind(this));
    return router;
  }
  get(req, res) {
    let slotId = req.params.id;
    return this.availabilityService
    .list(slotId)
    .then((data) => {
      res.send(data);
    });
  }

  post(req, res) {
    return this.availabilityService
      .add(req.body.availStartTime, req.body.availEndTime, req.params.id)
      .then(() => {
        res.redirect(req.get('referer'))
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  put(req, res) {
    return this.availabilityService
      .deactivate(req.params.id)
      .then(() => {
        res.redirect(req.get('referer'))
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }


  getAll(req, res) {
    // let userId = req.session.passport.user;
    this.availabilityService.readAll().then((data) => {
      res.send(data);
    });
  }

  getActive(req, res) {
    // let userId = req.session.passport.user;
    this.availabilityService.readActive().then((data) => {
      res.send(data);
    });
  }
}

module.exports = AvailabilityRouter;
