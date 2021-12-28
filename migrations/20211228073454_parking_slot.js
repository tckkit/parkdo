
exports.up = function(knex) {
    return knex.schema.createTable("parking_slot", (table) => {
        table.increments();
        table.timestamps(false, true);
        table.boolean("verified");
        table.integer("renter_id").references('id').inTable('account');
        table.integer("carpark_id").references('id').inTable('carpark');
        table.string("floor");
        table.string("unit");
        table.string("vehicle_size");
        table.string("description");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("parking_slot");
};
