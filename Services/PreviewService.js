class PreviewService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(start, end, location) {
    // if (start < Date.now()) {
    //   start = Date.now();
    // }
    try {
      let query = await this.knex
        // Moryah Version
        // .select("*")
        // .from("availability")
        // //.innerJoin("parking_slot", "availability.parking_slot_id", "parking_slot.id")
        // //.innerJoin("carpark", "carpark.id", "parking_slot.carpark_id")
        // .where("availability.start_time",'<=', start)
        // .where("availability.end_time",'>=', end)
        // //.where("area", location )

        // Jason Version
        .from("carpark")
        .innerJoin("area", "area.id", "carpark.area_id")
        .innerJoin("district", "district.id", "area.district_id")
        .innerJoin("region", "region.id", "district.region_id")
        .innerJoin("parking_slot", "parking_slot.carpark_id", "carpark.id")
        .innerJoin(
          "availability",
          "availability.parking_slot_id",
          "parking_slot.id"
        )
        .where("availability.active", true)
        .andWhere("district", location)
        .andWhere("availability.start_time", "<=", start)
        .andWhere("availability.end_time", ">=", end)
        .orderBy("availability.start_time", "asc");

      // console.log(query);
      return query.map((row) => ({
        id: row.id,
        parkingslot_id: row.parking_slot_id,
        carpark_id: row.carpark_id,
        renter_id: row.renter_id,
        floor: row.floor,
        unit: row.unit,
        verified: row.verified,
        vehicle_size: row.vehicle_size,
        description: row.description,
        carpark_district: row.district,
        carpark_area: row.area,
        carpark_building: row.building,
        carpark_hourly_charge: row.hourly_charge,
        start_date: new Date(row.start_time).toLocaleDateString(),
        start_time: new Date(row.start_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end_date: new Date(row.end_time).toLocaleDateString(),
        end_time: new Date(row.end_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        active: row.active,
      }));
    } catch (err) {
      console.log("List error", err);
    }
  }

  readActive() {
    let query = this.knex
      .from("carpark")
      .innerJoin("area", "area.id", "carpark.area_id")
      .innerJoin("district", "district.id", "area.district_id")
      .innerJoin("region", "region.id", "district.region_id")
      .innerJoin("parking_slot", "parking_slot.carpark_id", "carpark.id")
      .innerJoin(
        "availability",
        "availability.parking_slot_id",
        "parking_slot.id"
      )
      .where("availability.active", true)
      .orderBy("availability.start_time", "asc");

    return query.then((rows) => {
      // console.log(rows, "listed");
      return rows.map((row) => ({
        id: row.id,
        carpark_id: row.carpark_id,
        renter_id: row.renter_id,
        parkingslot_id: row.parking_slot_id,
        floor: row.floor,
        unit: row.unit,
        verified: row.verified,
        vehicle_size: row.vehicle_size,
        description: row.description,
        carpark_district: row.district,
        carpark_area: row.area,
        carpark_building: row.building,
        carpark_hourly_charge: row.hourly_charge,
        start_date: new Date(row.start_time).toLocaleDateString(),
        start_time: new Date(row.start_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end_date: new Date(row.end_time).toLocaleDateString(),
        end_time: new Date(row.end_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        active: row.active,
      }));
    });
  }
}

module.exports = PreviewService;
