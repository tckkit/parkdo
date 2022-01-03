var modal = document.getElementById("confirmation-box");
var btn = document.getElementById("book-this-btn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function (event) {
  modal.style.display = "block";
  var parkingslot_id = $(event.currentTarget).data("id")
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};