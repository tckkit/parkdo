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
                  <b style="color:red;">Not verified</b> <a href="renter-registration" style="text-decoration: none; color:black;">(Become a renter now)</a>
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
$(() => {
  var accountDetails = $.get(`/api/parkingslot`);
  accountDetails.done(function (data) {
    axios
      .get("/account")
      .then(() => {
        let handlebarCompile = Handlebars.compile(`
        {{#if parkingslotDetails}}
          <h3 class="heading">My Parking Slot</h3>
          {{#each parkingslotDetails}}
            <div class="div-block-10">
                <div class="div-block-13"><img src="images/img-placeholder.png" loading="lazy" width="140" height="140" alt="" class="image-3">
                </div>
                <div class="div-block-11">
                  <h5 class="heading-4 parking-slot-building">Carpark Building</h5>
                  <div class="parking-slot-area">Carpark area, Carpark district</div>
                  <div class="vehicle-size">Vehicle Size</div>
                  <div class="description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </div>
                <div class="div-block-12">
                  <a href="/parkingslot" class="submit-button edit w-button">Edit</a>
                </div>
              </div>
          {{/each}}
        {{else}}
          <h3 class="heading">My Parking Slot</h3>
          <div class="text-block-12">You haven not registered any parking slots yet.</div>
        {{/if}}
            `);
        $("#parkingslotDetails").html(
          handlebarCompile({ parkingslotDetails: data })
        );
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});
