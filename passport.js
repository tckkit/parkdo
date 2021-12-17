const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      try {
        let users = await knex("account").where({ username: username });
        if (users.length == 0) {
          return done(null, false, { message: "Incorrect credentials." });
        }
        let user = users[0];
        if (user.password === password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect credentials." });
        }
      } catch (err) {
        return done(err);
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
