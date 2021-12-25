$(() => {
  $("#add").submit((e) => {
    e.preventDefault();
    console.log("add pressed");
    // code here
    var val = $("textarea[name=note]").val();
    if (val === "") {
      return;
    }
    $("textarea[name=note]").val("");
    axios
      .post("/api/v1/all/history", {
        note: val,
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });
});
