class ParkingslotService {
  constructor(knex, axios) {
    this.knex = knex;
    this.axios = axios;
  }

  read(userId) {
    let query = this.knex
      .select()
      .from("parking_slot")
      .where("renter_id", userId)
      .orderBy("parking_slot.id", "asc");

    return query.then((rows) => {
      // console.log(rows, "listed");
      return rows.map((row) => ({
        id: row.id,
        carpark_id: row.carpark_id,
        renter_id: row.renter_id,
        floor: row.floor,
        unit: row.unit,
        verified: row.verified,
        vehicle_size: row.vehicle_size,
        description: row.description,
      }));
    });
  }
}

module.exports = ParkingslotService;
