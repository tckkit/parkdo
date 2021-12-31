
exports.up = function(knex) {
    return knex.schema.createTable("district", (table) => {
        table.increments();
        table.string("district");
        table.integer("region_id").references('id').inTable('region').notNull();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("district");
};
