class BookingRouter {
    constructor(express, bookingService) {
      this.express = express;
      this.bookingService = bookingService;
    }
  
    router() {
      let router = this.express.Router();
  
      router.get("/", this.post.bind(this));
  
      return router;
    }
  
    post(req, res) {
      console.log(
        `Posting StartTime:${req.body.starttime},  EndTime:${req.body.endtime} AT ${req.body.location}`
      );
      return this.bookingService
        .list(req.body.starttime, req.body.endtime, req.body.location)
        .then((data) => {
          console.log("checking data", data)
          res.render("listing", {output:data})})
        .catch((err) => res.status(500).json(err));
    }
  }
  
  module.exports = BookingRouter;
  