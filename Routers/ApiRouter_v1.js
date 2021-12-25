const { json } = require("body-parser");

class ApiRouter {
  constructor(express, orderService) {
    this.express = express;
    this.orderService = orderService;
  }

  router() {
    const router = this.express.Router();
    router.get("/all/history", this.getAllHistory.bind(this));
    router.post("/all/history", this.postAllHistory.bind(this));
    router.put("/all/history/:id", this.putOrder.bind(this));
    router.delete("/all/history/:id", this.deleteOrder.bind(this));
    return router;
  }

  // GET REQUEST
  getAllHistory(req, res) {
    this.orderService.readAll().then((data) => {
      res.send(data);
    });
  }

  // POST REQUEST (NOTE EXMAPLE) (Converted to Parkdo format)
  postAllHistory(req, res) {
    console.log("ApiRouter: POST Method (All History)");
    console.log("Order: " + req.body.order);
    console.log("User: " + req.auth.user);
    return (
      this.orderService
        // call the add method here
        .writeAll(req.body.order, req.auth.user)
        .catch((err) => {
          res.status(500).json(err);
        })
    );
  }

  // PUT REQUEST (NOTE EXMAPLE)
  putOrder(req, res) {
    let id = req.params.id;
    let note = req.body.note;
    let user = req.auth.user;
    //return this.noteService;
    return (
      this.noteService
        // The noteService fires the update command, this will update our note (and our JSON file)
        .update(id, note, user)

        // Then we fire list note from the same noteService which returns the array of notes for that user.
        .then(() => this.noteService.list(user))
        // Then we respond to the request with all of our notes in the JSON format back to our clients browser.
        .then((notes) => res.json(notes))
        // Catch error if need be
        .catch((err) => res.status(500).json(err))
    );
  }

  // DELETE REQUEST (NOTE EXMAPLE)
  deleteOrder(req, res) {
    console.log(`DELETE note no.${req.params.id}`);
    return this.noteService
      .remove(req.params.id, req.auth.user)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = ApiRouter;
