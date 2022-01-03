// // Passing availability to /listing
// $(() => {
//   var allListing = $.get(`/api/listing`);
//   allListing.done(function (data) {
//     axios
//       .get("/listing")
//       .then(() => {
//         let handlebarCompile = Handlebars.compile(
//           `{{#each listing}}
//                 <div class="div-block-10">
//                 <div class="div-block-13"><img src="images/img-placeholder.png" loading="lazy" width="140" height="140" alt="" class="image-4"></div>
//                 <div class="div-block-11">
//                     <h5 class="heading-4 parking-slot-building">{{this.carpark_building}}</h5>
//                     <div class="parking-slot-area">{{this.carpark_area}}, {{this.carpark_district}}</div>
//                     <div class="vehicle-size">{{this.vehicle_size}}</div>
//                     <div class="description">Description: {{this.description}}</div>
//                 </div>
//                 <div class="div-block-12">
//                     <div class="div-block-14">
//                     <div class="carpak-availability-text">Available at</div>
//                     <div clåass="carpak-availability-text time">{{this.start_date}} {{this.start_time}}</div>
//                     <div class="carpak-availability-text">to</div>
//                     <div class="carpak-availability-text time">{{this.end_date}} {{this.end_time}}</div>
//                     </div>
//                     <div class="pricing">$ {{ this.carpark_hourly_charge }}<br></div>
//                     <div class="pricing currency">HKD/hr<br></div>
//                     <a href="#" class="submit-button booking w-button">Book this !</a>
//                 </div>
//                 </div>
//               {{/each}}
//               `
//         );
//         $("#listing").html(handlebarCompile({ listing: data }));
//       })
//       .catch((err) => {
//         console.log(err);
//         window.location.reload();
//       });
//   });
// });
