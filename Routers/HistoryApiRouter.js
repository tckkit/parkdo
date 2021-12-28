const { json } = require("body-parser");

class ApiRouter {
  constructor(express, orderService) {
    this.express = express;
    this.orderService = orderService;
  }

  router() {
    const router = this.express.Router();
    router.get("/", this.getAllHistory.bind(this));
    router.post("/", this.postOrder.bind(this));
    router.get("/:id", this.getHistory.bind(this));
    router.put("/:id", this.putOrder.bind(this));
    router.delete("/:id", this.deleteOrder.bind(this));
    return router;
  }

  // GET REQUEST (all history)
  getAllHistory(req, res) {
    this.orderService.readAll().then((data) => {
      res.send(data);
    });
  }

  // GET REQUEST (individual history)
  getHistory(req, res) {
    let userId = req.user; // Pending
    let orderId = req.params.id;
    console.log("orderId: ", orderId);
    console.log("userId: ", userId);
    this.orderService.read(5, orderId).then((data) => {
      res.send(data);
    });
  }

  // POST REQUEST (NOTE EXMAPLE) (Converted to Parkdo format)
  postOrder(req, res) {
    console.log("ApiRouter: POST Method (All History)");
    console.log("Order: " + req.body.order);
    console.log("User: " + req.auth.user);
    const newOrder = {
      tenant_id: 3,
      renter_id: 2,
      carpark_id: 2,
    };
    return this.orderService.writeAll(newOrder, req.auth.user).catch((err) => {
      res.status(500).json(err);
    });
  }

  // PUT REQUEST (NOTE EXMAPLE)
  putOrder(req, res) {
    let id = req.params.id; // /api/history/<booking_record.id>
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
