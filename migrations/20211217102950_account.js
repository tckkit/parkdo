exports.up = function (knex) {
  return knex.schema.createTable("account", (table) => {
    table.increments();
    table.boolean("is_renter").default(false);
    table.string("username").unique();
    table.string("first_name");
    table.string("last_name");
    table.string("email").unique();
    table.integer("phone").unique();
    table.string("active");
    table.integer("balance");
    table.string("facebook_username").unique();
    table.string("facebook_password");
    table.string("google_username").unique();
    table.string("google_password");
    table.string("password");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
