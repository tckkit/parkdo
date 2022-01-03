class ParkingslotPicRouter {
    constructor(express, fs, parkingslotPicUpload) {
      this.express = express;
      this.fs = fs;
      this.parkingslotPicUpload = parkingslotPicUpload;
    }
  
    router() {
      const router = this.express.Router();
      router.post("/:id", this.post.bind(this));
      router.get("/:id", this.get.bind(this));

      return router;
    }

    post(req, res){
        let slotId = req.params.id;
            if (req.files.file) {
                return this.parkingslotPicUpload
                .write(
                slotId + "_parkingslot.jpeg",
                req.files.file.data)
                .then(() => {
                  res.redirect("/parkingslot/"+slotId)
                })
                .catch((err) => {
                  res.status(500).json(err)});
            }
    }

    get(req, res){
    let slotId = req.params.id;
      if (this.fs.existsSync("./public/uploaded/" + slotId + "_parkingslot.jpeg")){
        return res.send("/uploaded/" + slotId + "_parkingslot.jpeg")
      } else {
        return res.send("/images/" + "img-placeholder.png")
      }
  
  }
}
  module.exports = ParkingslotPicRouter;