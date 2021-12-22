class OrderService {
  constructor(knex) {
    this.knex = knex;
  }

  write(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.file, data, "utf8", (err) => {
        if (err) {
          reject(err);
        }
        resolve("Success");
      });
    });
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = OrderService;
