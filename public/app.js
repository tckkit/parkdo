// Passing booking_record to /history
$(() => {
  var allHistory = $.get(`/api/history`);
  allHistory.done(function (data) {
    axios
      .get("/history")
      .then(() => {
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
                    <div id="w-node-_3765c99e-745b-1dc5-1704-d3cfcfbfd091-5854d6b5" class="box-item">Gee Tuck Building, Sheung Wan</div>
                    <div class="box-item in">Arrival</div>
                    <div class="box-item out">Leave</div>
                    <div class="box-item-text">Booking</div>
                    <div class="box-item-text">10:30 am</div>
                    <div class="box-item-text">2:30pm</div>
                    <div class="box-item-text">Actual</div>
                    <div class="box-item-text">10:43 am</div>
                    <div class="box-item-text">2:12pm</div>
                  </div>
                </div>
                <div class="booking-info w-col w-col-3">
                  <div class="div-block-15">
                    <div class="pricing">+ $150</div>
                    <div class="text-block-18">Transaction ID: {{this.id}}</div>
                    <div class="box-status complete">{{this.status}}</div>
                  </div>
                </div>
              </div>
            </div>
          {{/each}}
          `
        );
        $("#list").html(handlebarCompile({ history: data }));
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

// Passing account details to /account
$(() => {
  var accountDetails = $.get(`/api/account`);
  accountDetails.done(function (data) {
    axios
      .get("/account")
      .then(() => {
        let handlebarCompile = Handlebars.compile(`
          {{#each accountDetails}}
            <div>Username</div>
            <div>{{this.username}}</div>
            <div>First name</div>
            <div>{{this.fname}}</div>
            <div>Last name</div>
            <div>{{this.lname}}</div>
            <div>Email</div>
            <div>{{this.email}}</div>
            <div>Phone</div>
            <div>{{this.phone}}</div>
            <div>Verified renter</div>
            <div>No (Become a renter now)</div>
          {{/each}}
          `);
        $("#accountDetails").html(handlebarCompile({ accountDetails: data }));
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});
