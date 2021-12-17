exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("carpark")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("carpark").insert([
        {
          username: "carpark1",
          password: "password",
          district: "Wan Chai",
          area: "Tin Hau",
          building: "Citicorp Centre",
          hourly_charge: 28,
        },
      ]);
    });
};
