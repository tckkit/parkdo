exports.up = function (knex) {
  return knex.schema.createTable("account", (table) => {
    table.increments();
    table.string("username").unique();
    table.string("password");
    table.string("facebook_username").unique();
    table.string("facebook_password");
    table.string("google_username").unique();
    table.string("google_password");
    table.string("email").unique();
    table.string("first_name");
    table.string("last_name");
    table.integer("phone").unique();
    table.string("active");
    table.integer("balance");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
