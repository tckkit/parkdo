class ProfilePicRouter {
    constructor(express, fs, profilePicUpload) {
      this.express = express;
      this.fs = fs;
      this.profilePicUpload = profilePicUpload;
    }
  
    router() {
      const router = this.express.Router();
      router.post("/", this.post.bind(this));
      router.get("/", this.get.bind(this));

      return router;
    }

    post(req, res){
        let userId = req.session.passport.user;
            if (req.files.file) {
                return this.profilePicUpload
                .write(
                userId + "_profile.jpeg",
                req.files.file.data)
                .then(() => {
                  res.redirect("/account")
                })
                .catch((err) => {
                  res.status(500).json(err)});
            }
    }

    get(req, res){
      let userId = req.session.passport.user;
      if (this.fs.existsSync("./public/uploaded/" + userId + "_profile.jpeg")){
        return res.send("/uploaded/" + userId + "_profile.jpeg")
      } else {
        return res.send("/images/" + "default-user-image.png")
      }
  
  }
}
  module.exports = ProfilePicRouter;