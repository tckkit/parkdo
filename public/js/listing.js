var modal = document.getElementById("confirmation-box");
var btn = document.getElementsByClassName("book-this-btn");
var span = document.getElementsByClassName("close")[0];
var bookingArrivalTime = document.getElementById("bookingArrivalTime");
var bookingLeaveTime = document.getElementById("bookingLeaveTime");

// Passing listing details to /listing

for (i = 0; i < btn.length; i++) {
  btn[i].onclick = function (event) {
    console.log("Clicked");
    modal.style.display = "block";
    var parkingslot_id = $(event.currentTarget).data("id");
    $(() => {
      var bookingDetails = $.get(`/parkingslot/details/${parkingslot_id}`);
      bookingDetails.done(function (data) {
        axios
          .get("/listing")
          .then(() => {
            let handlebarCompile = Handlebars.compile(
              `{{#each bookingDetails}}
                  <p>Carpark: Unit {{unit}}, Level {{this.level}}<span id="carpark-input"></span></p>
                  <p>Location: {{this.carpark_building}}, {{this.carpark_area}}, {{this.carpark_district}}<span id="location-input"></span></p>
                  <p>Hourly Rate: <span id="rate">{{this.carpark_hourly_charge}}</span><span id="hrlyrate-input"></span></p>
                {{/each}}
                `
            );
            $("#bookingDetails").html(
              handlebarCompile({ bookingDetails: data })
            );
          })
          .catch((err) => {
            console.log(err);
            window.location.reload();
          });
      });
    });
  };
}

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

$("#bookingArrivalTime").blur(() => {
  if ($("#bookingArrivalTime").val().length > 0) {
    var arrival = $("#bookingArrivalTime").val();
    var leave = $("#bookingLeaveTime").val();
    var rate = $("#rate")[0].innerHTML;
    if (arrival && leave) {
      var arrivalTime = new Date(arrival).getTime();
      var leaveTime = new Date(leave).getTime();
      var hourDiff = Math.ceil((leaveTime - arrivalTime) / 1000 / 60 / 60);
      var price = hourDiff * rate;
      axios
        .get("/listing")
        .then(() => {
          let handlebarCompile = Handlebars.compile(
            `
              <p>Duration: {{duration}} hour(s)<span id="duration-input"></span></p>
              <b>Total Price: HKD {{price}} <span id="price-calculation"></span></b>
            `
          );
          $("#price").html(
            handlebarCompile({ duration: hourDiff, price: price })
          );
        })
        .catch((err) => {
          console.log(err);
          window.location.reload();
        });
    }
  }
});

$("#bookingLeaveTime").blur(() => {
  if ($("#bookingLeaveTime").val().length > 0) {
    var arrival = $("#bookingArrivalTime").val();
    var leave = $("#bookingLeaveTime").val();
    var rate = $("#rate")[0].innerHTML;
    if (arrival && leave) {
      var arrivalTime = new Date(arrival).getTime();
      var leaveTime = new Date(leave).getTime();
      var hourDiff = Math.ceil((leaveTime - arrivalTime) / 1000 / 60 / 60);
      var price = hourDiff * rate;
      axios
        .get("/listing")
        .then(() => {
          let handlebarCompile = Handlebars.compile(
            `
              <p>Duration: {{duration}} hour(s)<span id="duration-input"></span></p>
              <b>Total Price: HKD {{price}} <span id="price-calculation"></span></b>
            `
          );
          $("#price").html(
            handlebarCompile({ duration: hourDiff, price: price })
          );
        })
        .catch((err) => {
          console.log(err);
          window.location.reload();
        });
    }
  }
});
