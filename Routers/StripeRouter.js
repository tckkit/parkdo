class StripeRouter {
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
        let amount = 500;
    
        stripe.customers.create({
           email: req.body.stripeEmail,
          source: req.body.stripeToken
        })
        .then(customer => {
          stripe.charges.create({
            amount,
            description: "Booking Charge",
               currency: "hkd",
               customer: customer.id
          })
          console.log(req.body.stripeToken)
          console.log(req.body.stripeToken)
        }
        )
        .then(charge => res.render("index"));
      }
  
  }
  
  module.exports = StripeRouter;
  