class ProfilePicRouter {
    constructor(express, fileUpload, profilePicUpload) {
      this.express = express;
      this.fileUpload = fileUpload
      this.profilePicUpload = profilePicUpload;
    }
  
    router() {
      const router = this.express.Router();
      router.post("/", this.post.bind(this));
      //router.get("/", isLoggedIn, this.get.bind(this));

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
  
  }
  
  module.exports = ProfilePicRouter;