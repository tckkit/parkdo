const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("../bcrypt");
const knexFile = require("../knexfile");
const knex = require("knex")(knexFile.development);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Local passport functions
  //------------------------------------------------------------------
  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      try {
        let users = await knex("account").where({ username: username });
        if (users.length == 0) {
          console.log("Incorrect user");
          return done(null, false, { message: "Incorrect user." });
        }
        let user = users[0];
        let result = await bcrypt.checkPassword(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    "local-signup",
    new LocalStrategy(async (username, password, done) => {
      try {
        let users = await knex("account").where({ username: username });
        if (users.length > 0) {
          console.log("Username already taken");
          return done(null, false, { message: "Username already taken" });
        }

        let hash = await bcrypt.hashPassword(password.toString());

        const newUser = {
          username: username,
          password: hash,
        };
        console.log(newUser);
        let userId = await knex("account").insert(newUser).returning("id");
        newUser.id = userId[0];
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    })
  );

  // Facebook passport functions
  //------------------------------------------------------------------
  const FacebookStrategy = require("passport-facebook").Strategy;

  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"],
      },

      async (accessToken, refreshToken, profile, done) => {
        let userResult = await knex("account").where({
          facebook_username: profile.id,
        });
        if (userResult == 0) {
          let user = {
            facebook_username: profile.id,
            email: profile._json.email,
            facebook_password: accessToken,
          };

          let userID = await knex("account").insert(user).returning("id");
          user.id = userID[0];
          done(null, user);
        } else {
          done(null, userResult[0]);
        }
      }
    )
  );

  // Google passport functions
  //------------------------------------------------------------------
  const GoogleStrategy = require("passport-google-oauth20").Strategy;

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        let userResult = await knex("account").where({
          google_username: profile.id,
        });
        if (userResult == 0) {
          let user = {
            google_username: profile.id,
            email: profile._json.email,
            google_password: accessToken,
          };

          let userID = await knex("account").insert(user).returning("id");
          user.id = userID[0];
          done(null, user);
        } else {
          done(null, userResult[0]);
        }
      }
    )
  );

  // passport functions
  //------------------------------------------------------------------
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let users = await knex("account").where({ id: id });
    if (users.length == 0) {
      return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });
};
