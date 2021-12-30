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
      console.log("Posting", req.body);
      return this.listingservice
       .list(req.body.starttime, req.body.endtime)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
    }
  
  }
  
  module.exports = ListingRouter;