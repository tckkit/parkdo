class AvailabilityRouter {
    constructor(express, availabilityService) {
      this.express = express
      this.availabilityService = availabilityService;
    }
  
    router() {
      let router = this.express.Router();
      router.post("/", this.post.bind(this));
      router.put("/:id", this.put.bind(this));
      return router;
    }
  
    post(req, res) {
      return this.availabilityService
      .add(req.body.starttime, req.body.endtime, req.peram.id)
      .catch((err) => {
        res.status(500).json(err)});
    }

    put(req, res) {

      }
  }
  
  module.exports = AvailabilityRouter;