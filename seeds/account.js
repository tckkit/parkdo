exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("account")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("account").insert([
        {
          username: "moryah",
          password: "password",
          email: "moryah@gmail.com",
          first_name: "Moryah",
          last_name: "Ng",
          phone: 98789583,
        },
        {
          username: "jason",
          password: "password",
          email: "jason@gmail.com",
          first_name: "Jason",
          last_name: "Tang",
          phone: 63703506,
        },
        {
          username: "robert",
          password: "password",
          email: "rob@gmail.com",
          first_name: "Robert",
          last_name: "Lee",
          phone: 12345678,
        },
      ]);
    });
};
