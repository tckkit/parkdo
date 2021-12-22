class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  list(user) {
    if (typeof user !== "undefined") {
      let query = this.knex
        .select("notes.id", "notes.note")
        .from("notes")
        .innerJoin("users", "notes.username_id", "users.id")
        .where("users.username", user)
        .orderBy("notes.id", "asc");

      return query.then((rows) => {
        console.log(rows, "listed");
        return rows.map((row) => ({
          id: row.id,
          notes: row.note,
        }));
      });
    }
  }

  async add(notes, user) {
    let query = await this.knex
      .select("id")
      .from("users")
      .where("users.username", user);

    console.log(query);

    if (query.length === 1) {
      await this.knex
        .insert({
          note: notes,
          username_id: query[0].id,
        })
        .into("notes");
    } else {
      throw new Error(`Cannot add a note to a user that does not exist!`);
    }
  }

  update(id, notes, user) {
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.username", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", id).update({
          note: notes,
        });
      } else {
        throw new Error(`Cannot update a note if the user doesn't exist!`);
      }
    });
  }

  remove(id, user) {
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.username", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", id).del();
      } else {
        throw new Error(`Cannot remove a note when the user doesn't exist!`);
      }
    });
  }
}

module.exports = NoteService;
