class ListService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(start, end, location) {
    if(start < Date.now()){
      start = Date.now()
    }
    try {
      let query = await this.knex
        .select("*")
        .from("availability")
        //.innerJoin("parking_slot", "availability.parking_slot_id", "parking_slot.id")
        //.innerJoin("carpark", "carpark.id", "parking_slot.carpark_id")
        .where("availability.start_time",'<=', start)
        .where("availability.end_time",'>=', end)
        //.where("area", location )

        console.log(query)

      return query.map((row) => ({
        id: row.id,
      }));
    } catch (err) {
      console.log("List error", err);
    }
  }

}

module.exports = ListService;