$(() => {
  var allHistory = $.get(`/api/history`);
  allHistory.done(function (data) {
    axios.get("/history", data).catch((err) => {
      console.log(err);
      window.location.reload();
    });
  });
});

// $(document).ready(function () {
//   $.ajax({
//     url: "/api/v1/all/history",
//     method: "GET",
//   }).done(function (data) {
//     console.log(data);
//   });
// });

// let allrestaurants = [];
// let datailedres = [];
// let restlist = [];

// $(function () {
//   $.get(`/api/v1/all/history`).done(function (data) {
//     console.log("This is history", data);
//     $(data)
//       // .find("LPS")
//       .each(function () {
//         allrestaurants.push($(this).text());
//         console.log(allrestaurants);
//       })
//       .each(function () {
//         var restname = $(this).find("SS").text();
//         $("#restaurant-picker-selector option").append(
//           $("<option />", {
//             text: restname,
//           })
//         );
//       });
//   });
// });

// var allHistory = $.get(`/api/v1/all/history`);
// allHistory.done(function (data) {
//   console.log(data);
// });
