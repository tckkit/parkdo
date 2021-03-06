exports.up = function (knex) {
  return knex.schema.createTable("carpark", (table) => {
    table.increments();
    table.string("username").unique().notNullable();
    table.string("password");
    table.integer("area_id").references("id").inTable("area").notNull();
    table.string("building");
    table.integer("hourly_charge");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("carpark");
};
