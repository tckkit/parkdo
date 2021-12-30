const { json } = require("body-parser");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // or redirect to '/signup'
}

class HistoryApiRouter {
  constructor(express, historyService) {
    this.express = express;
    this.historyService = historyService;
  }

  router() {
    const router = this.express.Router();
    router.post("/", this.postOrder.bind(this));
    router.get("/", isLoggedIn, this.getHistory.bind(this));
    router.get("/lease", isLoggedIn, this.getHistoryLease.bind(this));
    router.get("/rent", isLoggedIn, this.getHistoryRent.bind(this));
    router.get("/all", isLoggedIn, this.getAllHistory.bind(this));
    router.put("/:id", this.putOrder.bind(this)); // :id = booking_record.id
    // router.get("/:id", isLoggedIn, this.getHistory.bind(this)); // Not in use
    // router.delete("/:id", this.deleteOrder.bind(this)); // Not in use
    return router;
  }

  // GET REQUEST (all history)
  // (where req.session.passport.user = account_id andWhere is_admin = True)
  getAllHistory(req, res) {
    this.historyService.readAll().then((data) => {
      res.send(data);
    });
  }

  // GET REQUEST (individual history) (lease and rent)
  getHistory(req, res) {
    let userId = req.session.passport.user;
    this.historyService.read(userId).then((data) => {
      res.send(data);
    });
  }

  // GET REQUEST (individual history) (lease)
  getHistoryLease(req, res) {
    let userId = req.session.passport.user;
    this.historyService.readLease(userId).then((data) => {
      res.send(data);
    });
  }

  // GET REQUEST (individual history) (rent)
  getHistoryRent(req, res) {
    let userId = req.session.passport.user;
    this.historyService.readRent(userId).then((data) => {
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
    return this.historyService
      .writeAll(newOrder, req.auth.user)
      .catch((err) => {
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

module.exports = HistoryApiRouter;
