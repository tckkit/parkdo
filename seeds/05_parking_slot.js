exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("parking_slot")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("parking_slot").insert([
        {
          carpark_id: 1,
          renter_id: 1,
          floor: 2,
          unit: 14,
          verified: "true",
          vehicle_size: "Passenger cars",
          description:
            "This is an area or building where people can leave their cars.",
        },
        {
          carpark_id: 2,
          renter_id: 2,
          floor: 3,
          unit: 12,
          verified: "true",
          vehicle_size: "Box Trucks",
          description: "This is the description of parking slot A.",
        },
        {
          carpark_id: 3,
          renter_id: 2,
          floor: 3,
          unit: 12,
          verified: "true",
          vehicle_size: "Pickup Trucks",
          description: "This is the description of parking slot B.",
        },
        {
          carpark_id: 4,
          renter_id: 1,
          floor: 3,
          unit: 12,
          verified: "true",
          vehicle_size: "Vans",
          description: "This is the description of parking slot C.",
        },
        {
          carpark_id: 5,
          renter_id: 1,
          floor: 3,
          unit: 12,
          verified: "true",
          vehicle_size: "Passenger cars",
          description: "This is the description of parking slot D.",
        },
      ]);
    });
};
