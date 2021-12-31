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

     /*   async list(user) {
      if (typeof user !== "undefined") {
        try {
          let query = await this.knex
            .select("notes.id", "notes.content")
            .from("notes")
            .innerJoin("users", "notes.user_id", "users.id")
            .where("users.username", user)
            .orderBy("notes.id", "desc");
  
          return query.map((row) => ({
            id: row.id,
            content: row.content,
          }));
        } catch (err) {
          console.log("List error", err);
        }
      }
    }*/
  
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
  }
  
  module.exports = AvailabilityService;