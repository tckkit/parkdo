class RenterRouter {
  constructor(express, createRenter) {
    this.express = express
    this.createRenter = createRenter;
  }

  router() {
    let router = this.express.Router();

    //router.get("/:id", this.get.bind(this));
    router.post("/", this.post.bind(this));
    // router.put("/:id", this.put.bind(this));
    // router.delete("/:id", this.delete.bind(this));

    return router;
  }

  post(req, res) {
    console.log("User: ", req.session.passport.user)
    return this.createRenter
    .add(req.body, req.session.passport.user)
    .catch((err) => {
      res.status(500).json(err)});
  }

  /*
  get(req, res) {
    console.log(req.auth.user);
    return this.noteService
      .list(req.auth.user)
      .then((notes) => {
        console.log("Getting");
        console.log(notes);
        res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  }

  put(req, res) {
    return this.noteService
      .update(req.params.id, req.body.note, req.auth.user)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

  delete(req, res) {
    return this.noteService
      .remove(req.params.id, req.auth.user)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  } */
}

module.exports = RenterRouter;