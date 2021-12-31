exports.up = function (knex) {
  return knex.schema.createTable("area", (table) => {
    table.increments();
    table.string("area");
    table.integer("district_id").references("id").inTable("district").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("area");
};
