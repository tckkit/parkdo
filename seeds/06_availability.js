exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("availability")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("availability").insert([
        // parking slot id: 1
        {
          parking_slot_id: 1,
          start_time: "2022-01-04T00:00:00",
          end_time: "2022-01-04T14:00:00",
          active: true,
        },
        {
          parking_slot_id: 1,
          start_time: "2022-01-05T00:00:00",
          end_time: "2022-01-05T14:00:00",
          active: true,
        },
        {
          parking_slot_id: 1,
          start_time: "2022-01-09T00:00:00",
          end_time: "2022-01-09T14:00:00",
          active: true,
        },
        {
          parking_slot_id: 1,
          start_time: "2022-01-11T00:00:00",
          end_time: "2022-01-11T14:00:00",
          active: true,
        },
        {
          parking_slot_id: 1,
          start_time: "2022-01-06T14:00:00",
          end_time: "2022-01-06T21:00:00",
          active: true,
        },
        {
          parking_slot_id: 1,
          start_time: "2022-01-10T14:00:00",
          end_time: "2022-01-10T21:00:00",
          active: true,
        },
        {
          parking_slot_id: 1,
          start_time: "2022-01-10T14:00:00",
          end_time: "2022-01-10T21:00:00",
          active: true,
        },
        {
          parking_slot_id: 1,
          start_time: "2022-01-11T14:00:00",
          end_time: "2022-01-11T21:00:00",
          active: true,
        },
        // parking slot id: 2
        {
          parking_slot_id: 2,
          start_time: "2022-01-04T00:00:00",
          end_time: "2022-01-04T14:00:00",
          active: true,
        },
        {
          parking_slot_id: 2,
          start_time: "2022-01-05T00:00:00",
          end_time: "2022-01-05T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 2,
          start_time: "2022-01-09T00:00:00",
          end_time: "2022-01-09T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 2,
          start_time: "2022-01-11T00:00:00",
          end_time: "2022-01-11T14:00:00",
          active: false, //false
        },
        // {
        //   parking_slot_id: 2,
        //   start_time: "2022-01-02T14:00:00",
        //   end_time: "2022-01-02T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 2,
        //   start_time: "2022-01-04T14:00:00",
        //   end_time: "2022-01-04T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 2,
        //   start_time: "2022-01-06T14:00:00",
        //   end_time: "2022-01-06T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 2,
        //   start_time: "2022-01-08T14:00:00",
        //   end_time: "2022-01-07T21:00:00",
        //   active: true,
        // },

        // parking slot id: 3
        {
          parking_slot_id: 3,
          start_time: "2022-01-04T00:00:00",
          end_time: "2022-01-04T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 3,
          start_time: "2022-01-06T00:00:00",
          end_time: "2022-01-06T14:00:00",
          active: true,
        },
        {
          parking_slot_id: 3,
          start_time: "2022-01-09T00:00:00",
          end_time: "2022-01-09T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 3,
          start_time: "2022-01-11T00:00:00",
          end_time: "2022-01-11T14:00:00",
          active: false, //false
        },
        // {
        //   parking_slot_id: 3,
        //   start_time: "2022-01-02T14:00:00",
        //   end_time: "2022-01-02T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 3,
        //   start_time: "2022-01-04T14:00:00",
        //   end_time: "2022-01-04T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 3,
        //   start_time: "2022-01-06T14:00:00",
        //   end_time: "2022-01-06T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 3,
        //   start_time: "2022-01-08T14:00:00",
        //   end_time: "2022-01-07T21:00:00",
        //   active: true,
        // },

        // parking slot id: 4
        {
          parking_slot_id: 4,
          start_time: "2022-01-04T00:00:00",
          end_time: "2022-01-04T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 4,
          start_time: "2022-01-06T00:00:00",
          end_time: "2022-01-06T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 4,
          start_time: "2022-01-09T00:00:00",
          end_time: "2022-01-09T14:00:00",
          active: true,
        },
        {
          parking_slot_id: 4,
          start_time: "2022-01-11T00:00:00",
          end_time: "2022-01-11T14:00:00",
          active: false, //false
        },
        // {
        //   parking_slot_id: 4,
        //   start_time: "2022-01-02T14:00:00",
        //   end_time: "2022-01-02T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 4,
        //   start_time: "2022-01-04T14:00:00",
        //   end_time: "2022-01-04T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 4,
        //   start_time: "2022-01-06T14:00:00",
        //   end_time: "2022-01-06T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 4,
        //   start_time: "2022-01-08T14:00:00",
        //   end_time: "2022-01-07T21:00:00",
        //   active: true,
        // },

        // parking slot id: 5
        {
          parking_slot_id: 5,
          start_time: "2022-01-04T00:00:00",
          end_time: "2022-01-04T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 5,
          start_time: "2022-01-05T00:00:00",
          end_time: "2022-01-05T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 5,
          start_time: "2022-01-09T00:00:00",
          end_time: "2022-01-09T14:00:00",
          active: false, //false
        },
        {
          parking_slot_id: 5,
          start_time: "2022-01-11T00:00:00",
          end_time: "2022-01-11T14:00:00",
          active: true,
        },
        // {
        //   parking_slot_id: 5,
        //   start_time: "2022-01-02T14:00:00",
        //   end_time: "2022-01-02T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 5,
        //   start_time: "2022-01-04T14:00:00",
        //   end_time: "2022-01-04T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 5,
        //   start_time: "2022-01-06T14:00:00",
        //   end_time: "2022-01-06T21:00:00",
        //   active: true,
        // },
        // {
        //   parking_slot_id: 5,
        //   start_time: "2022-01-08T14:00:00",
        //   end_time: "2022-01-07T21:00:00",
        //   active: true,
        // },
      ]);
    });
};
