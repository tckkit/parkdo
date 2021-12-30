const bcrypt = require("../bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("carpark")
    .del()
    .then(async function () {
      const hashedPassword = await bcrypt.hashPassword("password");
      // Inserts seed entries
      return knex("carpark").insert([
        {
          id: 1,
          username: "carpark1",
          password: hashedPassword,
          district: "Central and Western",
          area: "Sheung Wan",
          building: "Gee Tuck Building",
          hourly_charge: 35,
        },
        {
          id: 2,
          username: "carpark2",
          password: hashedPassword,
          district: "Wan Chai",
          area: "Tin Hau",
          building: "Citicorp Centre",
          hourly_charge: 28,
        },
      ]);
    });
};
