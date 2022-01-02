// Passing booking_record (lease) to /history
$(() => {
  var allHistory = $.get(`/api/history/lease`);
  allHistory.done(function (data) {
    axios
      .get("/history")
      .then(() => {
        // <div class="pricing">+ $150</div>
        let handlebarCompile = Handlebars.compile(
          `{{#each history}}
                <div class="history-block">
                <div class="history-box w-row">
                  <div class="box-label w-col w-col-3">
                    <div class="booking-type-label lease">Lease</div>
                  </div>
                  <div class="box-info w-col w-col-6">
                    <div class="w-layout-grid box lease">
                      <div id="w-node-_80cd77a3-814e-c532-02e5-8097c3bc33b8-5854d6b5" class="date-box">{{this.created_at}}</div>
                      <div id="w-node-_3765c99e-745b-1dc5-1704-d3cfcfbfd091-5854d6b5" class="box-item">{{this.carpark_building}}, {{this.carpark_area}}, {{this.carpark_district}}</div>
                      <div class="box-item in">Arrival</div>
                      <div class="box-item out">Leave</div>
                      <div class="box-item-text">Booking</div>
                      <div class="box-item-text">{{this.booking_start_time}}</div>
                      <div class="box-item-text">{{this.booking_end_time}}</div>
                      <div class="box-item-text">Actual</div>
                      <div class="box-item-text">{{this.actual_start_time}}</div>
                      <div class="box-item-text">{{this.actual_end_time}}</div>
                    </div>
                  </div>
                  <div class="booking-info w-col w-col-3">
                    <div class="div-block-15">
                      <div class="text-block-18">Transaction ID: {{this.id}}</div>
                      <div class="box-status complete">{{this.status}}</div>
                    </div>
                  </div>
                </div>
              </div>
            {{/each}}
            `
        );
        $("#lease").html(handlebarCompile({ history: data }));
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});

// Passing booking_record (rent) to /history
$(() => {
  var allHistory = $.get(`/api/history/rent`);
  allHistory.done(function (data) {
    axios
      .get("/history")
      .then(() => {
        // <div class="pricing">+ $150</div>
        let handlebarCompile = Handlebars.compile(
          `{{#each history}}
                <div class="history-block">
                <div class="history-box w-row">
                  <div class="box-label w-col w-col-3">
                    <div class="booking-type-label rent">Rent</div>
                  </div>
                  <div class="box-info w-col w-col-6">
                    <div class="w-layout-grid box lease">
                      <div id="w-node-_80cd77a3-814e-c532-02e5-8097c3bc33b8-5854d6b5" class="date-box">{{this.created_at}}</div>
                      <div id="w-node-_3765c99e-745b-1dc5-1704-d3cfcfbfd091-5854d6b5" class="box-item">{{this.carpark_building}}, {{this.carpark_area}}, {{this.carpark_district}}</div>
                      <div class="box-item in">Arrival</div>
                      <div class="box-item out">Leave</div>
                      <div class="box-item-text">Booking</div>
                      <div class="box-item-text">{{this.booking_start_time}}</div>
                      <div class="box-item-text">{{this.booking_end_time}}</div>
                      <div class="box-item-text">Actual</div>
                      <div class="box-item-text">{{this.actual_start_time}}</div>
                      <div class="box-item-text">{{this.actual_end_time}}</div>
                    </div>
                  </div>
                  <div class="booking-info w-col w-col-3">
                    <div class="div-block-15">
                      <div class="text-block-18">Transaction ID: {{this.id}}</div>
                      <div class="box-status complete">{{this.status}}</div>
                    </div>
                  </div>
                </div>
              </div>
            {{/each}}
            `
        );
        $("#rent").html(handlebarCompile({ history: data }));
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});

// Passing account details to /history
$(() => {
  var accountDetails = $.get(`/api/account`);
  accountDetails.done(function (data) {
    axios
      .get("/history")
      .then(() => {
        let handlebarCompile = Handlebars.compile(`
          {{username}}
          `);
        $("#username").html(handlebarCompile({ username: data[0].fname }));
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});

$("#lease-filter").click(function () {
  console.log("clicked");
  $("#rent").css("display", "none");
  $("#lease").css("display", "block");
});

$("#rent-filter").click(function () {
  console.log("clicked");
  $("#lease").css("display", "none");
  $("#rent").css("display", "block");
});


// Passing account details to /account (for icon image)
$(() => {
  var accountDetails = $.get(`/api/profilepic`);
  accountDetails.done(function (data) {

    axios
      .get("/history")
      .then(() => {
        console.log(data)
        $("#profilePic-history").html(`<img id="profilepic-img" src="${data}" loading="lazy" width="100" height="100" alt="" class="account-image">`);
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});