const bcrypt = require("../bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("carpark")
    .del()
    .then(async function () {
      const hashedPassword = await bcrypt.hashPassword("password");
      // Inserts seed entries
      return knex("carpark").insert([
        // {
        //   id: 1,
        //   username: "carpark1",
        //   password: hashedPassword,
        //   district: "Central and Western",
        //   area: "Sheung Wan",
        //   building: "Gee Tuck Building",
        //   hourly_charge: 35,
        // },
        // {
        //   id: 2,
        //   username: "carpark2",
        //   password: hashedPassword,
        //   district: "Wan Chai",
        //   area: "Tin Hau",
        //   building: "Citicorp Centre",
        //   hourly_charge: 28,
        // },
        {
          id: 1,
          username: "carpark1",
          password: hashedPassword,
          // district: "Central and Western",
          // area: "Sheung Wan",
          area_id: 4,
          building: "Gee Tuck Building",
          hourly_charge: 35,
        },
        {
          id: 2,
          username: "carpark2",
          password: hashedPassword,
          // district: "Wan Chai",
          // area: "Tin Hau",
          area_id: 15,
          building: "Citicorp Centre",
          hourly_charge: 28,
        },
        {
          id: 3,
          username: "carpark3",
          password: hashedPassword,
          // district: "Wan Chai",
          // area: "Tin Hau",
          area_id: 10,
          building: "Times Square",
          hourly_charge: 36,
        },
        {
          id: 4,
          username: "carpark4",
          password: hashedPassword,
          // district: "Wan Chai",
          // area: "Tin Hau",
          area_id: 5,
          building: "IFC Two",
          hourly_charge: 38,
        },
        {
          id: 5,
          username: "carpark5",
          password: hashedPassword,
          // district: "Wan Chai",
          // area: "Tin Hau",
          area_id: 5,
          building: "IFC One",
          hourly_charge: 38,
        },
        {
          id: 6,
          username: "carpark6",
          password: hashedPassword,
          // district: "Wan Chai",
          // area: "Tin Hau",
          area_id: 30,
          building: "Stanley Plaza",
          hourly_charge: 31,
        },
      ]);
    });
};
