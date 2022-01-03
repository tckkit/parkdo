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

// Passing account details to /account (for icon image)
$(() => {
  var accountDetails = $.get(`/api/profilepic`);
  accountDetails.done(function (data) {
    axios
      .get("/account")
      .then(() => {
        console.log(data);
        $("#profilePic").html(
          `<img id="profilepic-img" src="${data}" loading="lazy" width="100" height="100" alt="" class="account-image">`
        );
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
                  <h5 class="heading-4 parking-slot-building">{{this.carpark_building}}</h5>
                  <div class="parking-slot-area">{{this.carpark_area}}, {{this.carpark_district}} </div>
                  <div class="vehicle-size">{{this.vehicle_size}}</div>
                  <div class="description">{{this.description}}</div>
                </div>
                <div class="div-block-12">
                  <a href="/parkingslot/{{this.id}}" class="submit-button edit w-button">Edit</a>
                </div>
              </div>
          {{/each}}
        {{else}}
          <h3 class="heading">My Parking Slot</h3>
          <div class="text-block-12">You have not registered any parking slots yet.</div>
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
