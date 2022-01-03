var modal = document.getElementById("add-availability");
var btn = document.getElementById("open-form");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

$(() => {
  console.log(window.location.pathname);
  var pathname = window.location.pathname;
  var slotId = pathname.replace("/parkingslot/", "");
  var slotImg = $.get(`/api/parkingslotimg/${slotId}`);
  console.log("pathname", slotImg);
  slotImg.done(function (data) {
    axios
      .get(`/parkingslot/${slotId}`)
      .then(() => {
        console.log("data", data);
        $("#parkingslot-img-container").html(
          `<img id="parkingslot-img" src="${data}" loading="lazy" width="100" height="100" alt="" class="account-image parking-slot">`
        );
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});

$(() => {
  console.log(window.location.pathname);
  var pathname = window.location.pathname;
  var slotId = pathname.replace("/parkingslot/", "");
  var slotAvailability = $.get(`/api/availability/${slotId}`);

  slotAvailability.done(function (data) {
    axios
      .get(`/parkingslot/${slotId}`)
      .then(() => {
        let handlebarCompile = Handlebars.compile(`
        {{#if slotAvailability}}
          {{#each slotAvailability}}
          <div class="column w-col w-col-3">
          <div>{{this.date}}</div>
        </div>
        <div class="w-col w-col-3">
          <div class="text-block-20">{{this.start_time}}</div>
        </div>
        <div class="w-col w-col-3">
          <div class="text-block-21">{{this.end_time}}</div>
        </div>
        
        <button class="remove-availability w-col w-col-3" data-id="{{this.id}}">Delete</button>
        
          {{/each}}     
        {{else}}
          <div class="text-block-12">You have not registered any parking slots yet.</div>
        {{/if}} 
            `);
        $("#availability-table").html(
          handlebarCompile({ slotAvailability: data })
        );
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});
e


$(".remove-availability").on("click", function () {
  console.log("duc jor")
});
