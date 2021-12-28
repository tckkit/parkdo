
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('district')
  .del()
  .then(() => {
    return knex ('region')
    .del()
    .then(() => {
      return knex('region').insert([
        {id: 1, region: 'New Territories'},
        {id: 2, region: 'Kowloon'},
        {id: 3, region: 'Hong Kong Island'}
      ])
      .then (() => {
        return knex('district').insert([
          {id: 1, district: "Islands", region_id: 1},
          {id: 2, district: "Kwai Tsing", region_id: 1},
          {id: 3, district: "North", region_id: 1},
          {id: 4, district: "Sai Kung", region_id: 1},
          {id: 5, district: "Sha Tin", region_id: 1},
          {id: 6, district: "Tai Po", region_id: 1},
          {id: 7, district: "Tsuen Wan", region_id: 1},
          {id: 8, district: "Tuen Mun", region_id: 1},
          {id: 9, district: "Yuen Long", region_id: 1},
        ])
      });

    })
})
}