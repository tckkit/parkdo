class AvailabilityService {
  constructor(knex, axios) {
    this.knex = knex;
    this.axios = axios;
  }

  async add(start, end, parkingSlotId) {
    if (typeof parkingSlotId !== "undefined") {
      try {
        await this.knex
          .insert({
            parking_slot_id: parkingSlotId,
            start_time: start,
            end_time: end,
            active: true,
          })
          .into("availability");
      } catch (err) {
        console.log("Parking slot has not registered yet.", error);
      }
    }
  }

  list(slotId) {
   // let current = new Date.now()
   // console.log("current", current)
    let query = this.knex
      .from("availability")
      .where("parking_slot_id", slotId)
    //  .andWhere("end_time", ">", current)
      .andWhere("active", true)
      .orderBy("availability.start_time", "asc");

    return query.then((rows) => {
      console.log(rows, "listed");
      return rows.map((row) => ({

        id: row.id,
        date: new Date(row.start_time).toLocaleDateString(),
        start_time: new Date(row.start_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end_time: new Date(row.end_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    });
  }


  async deactivate(id, note, user) {
    if (typeof user !== "undefined") {
      try {
        return await this.knex("notes")
          .update({ content: note })
          .where("id", id);
      } catch (err) {
        console.log("Update error", err);
      }
    }
  }
  /*
    async remove(id, user) {
      if (typeof user !== "undefined") {
        try {
          return await this.knex("notes").del().where("id", id);
        } catch (err) {
          console.log("Delete error", err);
        }
      }
    } */

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

  readAll() {
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
      .orderBy("availability.start_time", "asc");

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

module.exports = AvailabilityService;
