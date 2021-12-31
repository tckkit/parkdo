exports.seed = function (knex) {
  return knex("region")
    .del()
    .then(() => {
      return knex("district")
        .del()
        .then(() => {
          return knex("area")
            .del()
            .then(() => {
              return knex("region")
                .insert([
                  { id: 1, region: "New Territories" },
                  { id: 2, region: "Kowloon" },
                  { id: 3, region: "Hong Kong Island" },
                ])
                .then(() => {
                  return knex("district").insert([
                    { id: 1, district: "Islands", region_id: 1 },
                    { id: 2, district: "Kwai Tsing", region_id: 1 },
                    { id: 3, district: "North", region_id: 1 },
                    { id: 4, district: "Sai Kung", region_id: 1 },
                    { id: 5, district: "Sha Tin", region_id: 1 },
                    { id: 6, district: "Tai Po", region_id: 1 },
                    { id: 7, district: "Tsuen Wan", region_id: 1 },
                    { id: 8, district: "Tuen Mun", region_id: 1 },
                    { id: 9, district: "Yuen Long", region_id: 1 },
                    { id: 10, district: "Kowloon City", region_id: 2 },
                    { id: 11, district: "Kwun Tong", region_id: 2 },
                    { id: 12, district: "Sham Shui Po", region_id: 2 },
                    { id: 13, district: "Wong Tai Sin", region_id: 2 },
                    { id: 14, district: "Yau Tsim Mong", region_id: 2 },
                    { id: 15, district: "Central and Western", region_id: 3 },
                    { id: 16, district: "Eastern", region_id: 3 },
                    { id: 17, district: "Southern", region_id: 3 },
                    { id: 18, district: "Wan Chai", region_id: 3 },
                  ]);
                })
                .then(() => {
                  return knex("area").insert([
                    { id: 1, area: "Kennedy Town", district_id: 15 },
                    { id: 2, area: "Shek Tong Tsui", district_id: 15 },
                    { id: 3, area: "Sai Ying Pun", district_id: 15 },
                    { id: 4, area: "Sheung Wan", district_id: 15 },
                    { id: 5, area: "Central", district_id: 15 },
                    { id: 6, area: "Admiralty", district_id: 15 },
                    { id: 7, area: "Mid-levels", district_id: 15 },
                    { id: 8, area: "Peak", district_id: 15 },
                    { id: 9, area: "Wan Chai", district_id: 18 },
                    { id: 10, area: "Causeway Bay", district_id: 18 },
                    { id: 11, area: "Happy Valley", district_id: 18 },
                    { id: 12, area: "Tai Hang", district_id: 18 },
                    { id: 13, area: "So Kon Po", district_id: 18 },
                    { id: 14, area: "Jardine's Lookout", district_id: 18 },
                    { id: 15, area: "Tin Hau", district_id: 16 },
                    { id: 16, area: "Braemar Hill", district_id: 16 },
                    { id: 17, area: "North Point", district_id: 16 },
                    { id: 18, area: "Quarry Bay", district_id: 16 },
                    { id: 19, area: "Sai Wan Ho", district_id: 16 },
                    { id: 20, area: "Shau Kei Wan", district_id: 16 },
                    { id: 21, area: "Chai Wan", district_id: 16 },
                    { id: 22, area: "Siu Sai Wan", district_id: 16 },
                    { id: 23, area: "Pok Fu Lam", district_id: 17 },
                    { id: 24, area: "Aberdeen", district_id: 17 },
                    { id: 25, area: "Ap Lei Chau", district_id: 17 },
                    { id: 26, area: "Wong Chuk Hang", district_id: 17 },
                    { id: 27, area: "Shouson Hill", district_id: 17 },
                    { id: 28, area: "Repulse Bay", district_id: 17 },
                    { id: 29, area: "Chung Hom Kok", district_id: 17 },
                    { id: 30, area: "Stanley", district_id: 17 },
                    { id: 31, area: "Tai Tam", district_id: 17 },
                    { id: 32, area: "Shek O", district_id: 17 },
                  ]);
                });
            });
        });
    });
  // Deletes ALL existing entries
  // return knex("district")
  //   .del()
  //   .then(() => {
  //     return knex("region")
  //       .del()
  //       .then(() => {
  //         return knex("region")
  //           .insert([
  //             { id: 1, region: "New Territories" },
  //             { id: 2, region: "Kowloon" },
  //             { id: 3, region: "Hong Kong Island" },
  //           ])
  //           .then(() => {
  //             return knex("district").insert([
  //               { id: 1, district: "Islands", region_id: 1 },
  //               { id: 2, district: "Kwai Tsing", region_id: 1 },
  //               { id: 3, district: "North", region_id: 1 },
  //               { id: 4, district: "Sai Kung", region_id: 1 },
  //               { id: 5, district: "Sha Tin", region_id: 1 },
  //               { id: 6, district: "Tai Po", region_id: 1 },
  //               { id: 7, district: "Tsuen Wan", region_id: 1 },
  //               { id: 8, district: "Tuen Mun", region_id: 1 },
  //               { id: 9, district: "Yuen Long", region_id: 1 },
  //             ]);
  //           });
  //       });
  //   });
};
