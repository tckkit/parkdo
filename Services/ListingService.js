class ListingService {
  constructor(knex, axios) {
    this.knex = knex;
    this.axios = axios;
  }

  read(userId) {
    let query = this.knex
      .select()
      .from("account")
      .where("id", userId)
      .orderBy("account.id", "asc");

    return query.then((rows) => {
      // console.log(rows, "listed");
      return rows.map((row) => ({
        id: row.id,
        username: row.username,
        email: row.email,
        fname: row.first_name,
        lname: row.last_name,
        phone: row.phone,
        created_at: row.created_at,
        verified_renter: row.is_renter,
      }));
    });
  }
}

module.exports = ListingService;
