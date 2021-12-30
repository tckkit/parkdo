exports.up = function (knex) {
  return knex.schema.createTable("booking_record", (table) => {
    table.increments();
    table.integer("tenant_id").unsigned();
    // table.foreign("tenant_id").references("account.id");
    table.integer("renter_id").unsigned();
    // table.foreign("renter_id").references("account.id"); //NOT OK
    table.integer("carpark_id").unsigned();
    // table.foreign("carpark_id").references("carpark.id"); //NOT OK
    table.datetime("booking_start_time");
    table.datetime("booking_end_time");
    table.datetime("actual_start_time").nullable();
    table.datetime("actual_end_time").nullable();
    table.string("status").nullable().default("Pending");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("booking_record");
};
