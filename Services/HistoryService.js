class HistoryService {
  constructor(knex, axios) {
    this.knex = knex;
    this.axios = axios;
  }

  readAll() {
    let query = this.knex
      .select()
      .from("booking_record")
      .orderBy("booking_record.id", "asc");

    return query.then((rows) => {
      // console.log(rows, "listed");
      return rows.map((row) => ({
        id: row.id,
        created_at: row.created_at,
        tenant_id: row.tenant_id,
        renter_id: row.renter_id,
        carpark_id: row.carpark_id,
        // booking_start_time: row.booking_start_time,
        // actual_start_time: row.actual_start_time,
        // actual_end_time: row.actual_end_time,
        status: row.status,
        status_last_update_time: row.updated_at,
      }));
    });
  }

  read(userId) {
    let query = this.knex
      .from("booking_record")
      .innerJoin("carpark", "booking_record.carpark_id", "carpark.id")
      .where("booking_record.tenant_id", userId)
      .orWhere("booking_record.renter_id", userId)
      // .andWhere("id", orderId) // Not in use
      .orderBy("booking_record.id", "asc");

    return query.then((rows) => {
      // console.log(rows, "listed");
      return rows.map((row) => ({
        id: row.id,
        created_at: row.created_at,
        tenant_id: row.tenant_id,
        renter_id: row.renter_id,
        carpark_id: row.carpark_id,
        carpark_name: row.username,
        carpark_district: row.district,
        carpark_area: row.area,
        carpark_building: row.building,
        carpark_hourly_charge: row.hourly_charge,
        booking_start_time: row.booking_start_time, //Time
        booking_end_time: row.booking_end_time, //Time
        actual_start_time: row.actual_start_time, //Time
        actual_end_time: row.actual_end_time, //Time
        status: row.status,
        status_last_update_time: row.updated_at, //Time
      }));
    });
  }

  readLease(userId) {
    let query = this.knex
      .from("carpark")
      .innerJoin("area", "area.id", "carpark.area_id")
      .innerJoin("district", "district.id", "area.district_id")
      .innerJoin("region", "region.id", "district.region_id")
      .innerJoin("booking_record", "booking_record.carpark_id", "carpark.id")
      .where("booking_record.renter_id", userId)
      .orderBy("booking_record.id", "asc");

    return query.then((rows) => {
      // console.log(rows, "listed");
      return rows.map((row) => ({
        id: row.id,
        created_at: new Date(row.created_at).toLocaleDateString(),
        tenant_id: row.tenant_id,
        renter_id: row.renter_id,
        carpark_id: row.carpark_id,
        carpark_name: row.username,
        carpark_district: row.district,
        carpark_area: row.area,
        carpark_building: row.building,
        carpark_hourly_charge: row.hourly_charge,
        booking_start_time: new Date(row.booking_start_time).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        booking_end_time: new Date(row.booking_end_time).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        actual_start_time: new Date(row.actual_start_time).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        actual_end_time: new Date(row.actual_end_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: row.status,
        status_last_update_time: new Date(row.updated_at).toLocaleString(),
      }));
    });
  }

  readRent(userId) {
    let query = this.knex
      .from("carpark")
      .innerJoin("area", "area.id", "carpark.area_id")
      .innerJoin("district", "district.id", "area.district_id")
      .innerJoin("region", "region.id", "district.region_id")
      .innerJoin("booking_record", "booking_record.carpark_id", "carpark.id")
      .where("booking_record.tenant_id", userId)
      .orderBy("booking_record.id", "asc");

    return query.then((rows) => {
      // console.log(rows, "listed");
      return rows.map((row) => ({
        id: row.id,
        created_at: new Date(row.created_at).toLocaleDateString(),
        tenant_id: row.tenant_id,
        renter_id: row.renter_id,
        carpark_id: row.carpark_id,
        carpark_name: row.username,
        carpark_district: row.district,
        carpark_area: row.area,
        carpark_building: row.building,
        carpark_hourly_charge: row.hourly_charge,
        booking_start_time: new Date(row.booking_start_time).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        booking_end_time: new Date(row.booking_end_time).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        actual_start_time: new Date(row.actual_start_time).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        actual_end_time: new Date(row.actual_end_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: row.status,
        status_last_update_time: new Date(row.updated_at).toLocaleString(),
      }));
    });
  }

  async writeAll(order, user) {
    try {
      let query = await this.knex
        .select("id")
        .from("account")
        .where("account.username", user);

      let tenant_id = order.tenant_id;
      let renter_id = order.renter_id;
      let carpark_id = order.carpark_id;

      const newOrder = {
        tenant_id: tenant_id,
        renter_id: renter_id,
        carpark_id: carpark_id,
      };
      if (query.length === 1) {
        let orderId = await this.knex
          .insert(newOrder)
          .into("booking_record")
          .returning("id");
        console.log(`A new order created, id: ${orderId}`, newOrder);
      } else {
        throw new Error(`Order failed to place`);
      }
    } catch (err) {
      console.log("Create order error");
    }
  }
}

module.exports = HistoryService;
