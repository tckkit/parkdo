
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parking_slot').del()
    .then(function () {
      // Inserts seed entries
      return knex('parking_slot').insert([
        {
          carpark_id: 1,
          renter_id: 1,
          floor: 2,
          unit: 14,
          verified: "true",
          vehicle_size: "Passenger cars",
          description: "This is an area or building where people can leave their cars.",
        }
      ]);
    });
};
