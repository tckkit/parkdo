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
