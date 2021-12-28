
exports.up = function(knex) {
    return knex.schema.createTable("availability", (table) => {
        table.increments();
        table.timestamps(false, true);
        table.integer("parking_slot_id").references('id').inTable('parking_slot');
        table.datetime("start_time");
        table.datetime("end_time");
        table.boolean("active");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("availability");
};
