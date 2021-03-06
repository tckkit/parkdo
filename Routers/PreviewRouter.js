class PreviewRouter {
  constructor(express, previewservice) {
    this.express = express;
    this.previewservice = previewservice;
  }

  router() {
    let router = this.express.Router();

    router.post("/", this.post.bind(this));
    router.get("/", this.getActive.bind(this));
    return router;
  }

  post(req, res) {
    // console.log(req.body);
    // console.log(
    // `Posting StartTime:${req.body.starttime},  EndTime:${req.body.endtime} AT ${req.body.location}`
    // );
    return this.previewservice
      .list(req.body.starttime, req.body.endtime, req.body.location)
      .then((data) => {
        // console.log("checking data", data);
        res.render("preview", { output: data });
      })
      .catch((err) => res.status(500).json(err));
  }

  getActive(req, res) {
    // let userId = req.session.passport.user;
    this.previewservice.readActive().then((data) => {
      res.render("preview", { output: data });
      // res.send(data);
    });
  }
}

module.exports = PreviewRouter;
