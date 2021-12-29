var accountId = $.get(`/api/account`).done((data) => {
  return data[0].id;
});

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
                    <div id="w-node-_3765c99e-745b-1dc5-1704-d3cfcfbfd091-5854d6b5" class="box-item">{{this.carpark_building}}, {{this.carpark_area}}, {{this.carpark_district}} </div>
                    <div class="box-item in">Arrival</div>
                    <div class="box-item out">Leave</div>
                    <div class="box-item-text">Booking</div>
                    <div class="box-item-text">{{this.booking_start_time}}</div>
                    <div class="box-item-text">{{this.booking_end_time}}</div>
                    <div class="box-item-text">Actual</div>
                    <div class="box-item-text">{{this.actual_start_time}}</div>
                    <div class="box-item-text">{{this.actual_start_time}}</div>
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
            <div>
              {{#if verified_renter}}
                <b style="color:green;">Verified renter</b>
              {{else}}
                <b style="color:red;">Not verified</b> (Become a renter now)
              {{/if}}
            </div>
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

// Passing parkingslot details to /account
// Handlebars.registerHelper("ifCond", function (slot, options) {
//   if (slot.length > 0) {
//     return options.fn({
//       slots: `
//       {{#each parkingslotDetails}}
//         <div class="div-block-10">
//           <div class="div-block-13"><img src="images/img-placeholder.png" loading="lazy" width="140" height="140" alt="" class="image-3">
//           </div>
//           <div class="div-block-11">
//             <h5 class="heading-4 parking-slot-building">Carpark Building</h5>
//             <div class="parking-slot-area">Carpark area, Carpark district</div>
//             <div class="vehicle-size">Vehicle Size</div>
//             <div class="description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
//           </div>
//           <div class="div-block-12">
//             <a href="/manage" class="submit-button edit w-button">Edit</a>
//           </div>
//         </div>
//       {{/each}}
//       `,
//     });
//   }
//   return options.fn({
//     slots: `<div class="text-block-12">You haven not registered any parking slots yet.</div>`,
//   });
// });

// var parkingslotDetails = $.get(`/api/parkingslot`);

// $(() => {
//   parkingslotDetails.done(function (data) {
//     axios
//       .get("/account")
//       .then(() => {
//         let handlebarCompile = Handlebars.compile(`
//             {{#ifCond parkingslotDetails}}
//               {{slots}}
//             {{/#ifCond}}
//           `);
//         $("#parkingslotDetails").html(
//           handlebarCompile({ parkingslotDetails: data })
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//         window.location.reload();
//       });
//   });
// });
