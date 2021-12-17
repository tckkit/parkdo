exports.up = function (knex) {
  return knex.schema.createTable("account", (table) => {
    table.increments();
    table.string("username").unique().notNullable();
    table.string("password");
    table.string("email").unique().notNullable();
    table.string("first_name");
    table.string("last_name");
    table.integer("phone").unique().notNullable();
    table.string("active");
    table.integer("balance");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
