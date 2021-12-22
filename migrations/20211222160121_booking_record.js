exports.up = function (knex) {
  return knex.schema.createTable("booking_record", (table) => {
    table.increments(); //OK
    table.integer("tenant_id").unsigned();
    // table.foreign("tenant_id").references("account.id"); //OK
    table.integer("renter_id").unsigned();
    // table.foreign("renter_id").references("account.id"); //OK
    table.integer("carpark_id").unsigned();
    // table.foreign("carpark_id").references("account.id"); //OK
    // table.datetime("booking_start_time"); //OK
    // table.datetime("booking_end_time"); //OK
    // table.datetime("actual_start_time").nullable(); //OK
    // table.datetime("actual_end_time").nullable(); //OK
    table.string("status").nullable(); //OK
    table.timestamps(false, true); //OK
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("booking_record");
};

// nullable — column.nullable()
