class RenterRouter {
  constructor(express, createRenter) {
    this.express = express
    this.createRenter = createRenter;
  }

  router() {
    let router = this.express.Router();
    router.post("/", this.post.bind(this));
    return router;
  }

  post(req, res) {
    console.log("User: ", req.session.passport.user)
    return this.createRenter
    .add(req.body, req.session.passport.user)
    .catch((err) => {
      res.status(500).json(err)});
  }
}

module.exports = RenterRouter;