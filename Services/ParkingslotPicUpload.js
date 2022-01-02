
class ParkingslotPicUpload {
    constructor(fs, axios, uploadDirectory) {
      this.fs = fs;
      this.axios = axios;
      this.uploadDirectory = uploadDirectory;
    }

    write(name, data) {
      return new Promise((resolve, reject) => {
        this.fs.writeFile(this.uploadDirectory + "/" + name, data, (error) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(name);
        });
      })
    }

    read(file) {
      return new Promise((resolve, reject) => {
        this.fs.readFile(uploadDirectory + "/" + file, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
        
    }


  
  }
  
  module.exports = ParkingslotPicUpload;