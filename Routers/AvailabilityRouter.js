class AvailabilityRouter {
  constructor(express, availabilityService) {
    this.express = express;
    this.availabilityService = availabilityService;
  }

  router() {
    let router = this.express.Router();
    router.get("/", this.getAll.bind(this));
    router.get("/active", this.getActive.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    return router;
  }

  post(req, res) {
    return this.availabilityService
      .add(req.body.starttime, req.body.endtime, req.peram.id)
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  put(req, res) {}

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
