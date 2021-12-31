
exports.up = function(knex) {
    return knex.schema.createTable("region", (table) => {
        table.increments();
        table.string("region");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("region");
};
