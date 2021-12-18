const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("./bcrypt");
const knexFile = require("./knexfile");
const knex = require("knex")(knexFile.development);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      try {
        let users = await knex("account").where({ username: username });
        if (users.length == 0) {
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
    new LocalStrategy(async (email, password, done) => {
      try {
        let users = await knex("account").where({ email: email });
        if (users.length > 0) {
          return done(null, false, { message: "Email already taken" });
        }
        let hash = await bcrypt.hashPassword(password);
        const newUser = {
          email: email,
          password: hash,
        };
        let userId = await knex("account").insert(newUser).returning("id");
        newUser.id = userId[0];
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    })
  );

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
