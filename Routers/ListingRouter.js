class ListingRouter {
  constructor(express, listingservice) {
    this.express = express;
    this.listingservice = listingservice;
  }

  router() {
    let router = this.express.Router();

    router.post("/", this.post.bind(this));

    return router;
  }

  post(req, res) {
    console.log(
      `Posting StartTime:${req.body.starttime},  EndTime:${req.body.endtime} AT ${req.body.location}`
    );
    return this.listingservice
      .list(req.body.starttime, req.body.endtime, req.body.location)
      .then((data) => {
        res.render("listing", {output:data})})
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = ListingRouter;
