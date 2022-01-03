class RenterRouter {
  constructor(express, createRenter) {
    this.express = express;
    this.createRenter = createRenter;
  }

  router() {
    let router = this.express.Router();
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    return router;
  }

  post(req, res) {
    console.log("User: ", req.session.passport.user);
    return this.createRenter
      .add(req.body, req.session.passport.user)
      .then(() => {
        res.redirect("/account");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  put(req, res) {
    console.log("putting");
    return this.createRenter
      .update(req.params.id, req.body.desciption)
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = RenterRouter;
