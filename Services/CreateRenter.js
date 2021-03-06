class CreateRenter {
  constructor(knex, axios) {
    this.knex = knex;
    this.axios = axios;
  }

  async add(renterRegForm, userId) {
    if (typeof userId !== "undefined") {
      console.log("adding");
      try {
        await this.knex
          .insert({
            carpark_id: renterRegForm.Building,
            renter_id: userId,
            floor: renterRegForm.Floor,
            unit: renterRegForm.Unit,
            verified: true,
            vehicle_size: renterRegForm.vehicleSize,
            description: renterRegForm.Description,
          })
          .into("parking_slot");
        await this.knex("account")
          .update({ is_renter: true })
          .where("id", userId);
      } catch (err) {
        console.log("No such User", error);
      }
    }
  }

  async update(id, description) {
    if (typeof id !== "undefined") {
      try {
        return await this.knex("parking_slot")
          .update({ description: description })
          .where("id", id);
      } catch (err) {
        console.log("Update error", err);
      }
    }
  }

  // async verify(userId) {
  //   if (typeof userId !== "undefined") {
  //     try {
  //       await this.knex("account")
  //         .update({ is_renter: true })
  //         .where("id", userId);
  //     } catch (err) {
  //       console.log("Update error", err);
  //     }
  //   }
  // }

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
    }
  
    async update(id, note, user) {
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

module.exports = CreateRenter;
