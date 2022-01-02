class ParkingslotService {
  constructor(knex, axios) {
    this.knex = knex;
    this.axios = axios;
  }

  read(userId) {
    let query = this.knex
      // .from("parking_slot")
      // .innerJoin("carpark", "parking_slot.carpark_id", "carpark.id")
      // .where("renter_id", userId)
      // .orderBy("parking_slot.id", "asc");
      .from("carpark")
      .innerJoin("area", "area.id", "carpark.area_id")
      .innerJoin("district", "district.id", "area.district_id")
      .innerJoin("region", "region.id", "district.region_id")
      .innerJoin("parking_slot", "parking_slot.carpark_id", "carpark.id")
      .where("renter_id", userId)
      .orderBy("parking_slot.id", "asc");

    // if (query.length > 0) {
    return query.then((rows) => {
      if (rows.length > 0) {
        return rows.map((row) => ({
          // from parking_slot table
          id: row.id,
          carpark_id: row.carpark_id,
          renter_id: row.renter_id,
          floor: row.floor,
          unit: row.unit,
          verified: row.verified,
          vehicle_size: row.vehicle_size,
          description: row.description,
          // from carpark table
          carpark_district: row.district,
          carpark_area: row.area,
          carpark_building: row.building,
          carpark_hourly_charge: row.hourly_charge,
        }));
      }
      return false;
    });
  }

  readparkingslot(userId, parkingslotId) {
    let query = this.knex
      .from("carpark")
      .innerJoin("area", "area.id", "carpark.area_id")
      .innerJoin("district", "district.id", "area.district_id")
      .innerJoin("region", "region.id", "district.region_id")
      .innerJoin("parking_slot", "parking_slot.carpark_id", "carpark.id")
      .where("renter_id", userId)
      .andWhere("parking_slot.id", parkingslotId)
      .orderBy("parking_slot.id", "asc");

    // if (query.length > 0) {
    return query.then((rows) => {
      if (rows.length > 0) {
        return rows.map((row) => ({
          // from parking_slot table
          id: row.id,
          carpark_id: row.carpark_id,
          renter_id: row.renter_id,
          level: row.floor,
          unit: row.unit,
          verified: row.verified,
          vehicle_size: row.vehicle_size,
          description: row.description,
          // from carpark table
          carpark_district: row.district,
          carpark_area: row.area,
          carpark_building: row.building,
          carpark_hourly_charge: row.hourly_charge,
        }));
      }
      return false;
    });
  }
}

module.exports = ParkingslotService;
