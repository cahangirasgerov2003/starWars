$(document).ready(() => {
  let clickCounter = 0;

  $(document).on("click", ".carakters", function () {
    if (clickCounter === 0) {
      $(this).attr("data-myCaraktersID", "1");
      $("#selectCharacter").addClass("d-none");
      $(".carakters").each(function () {
        if ($(this).attr("data-myCaraktersID") !== "1") {
          $("#enemiesAvailable").addClass("d-none");
          $("#enemiesAvailableContainer").append(this);
          $(this).css({
            "background-color": "red",
            border: "1px solid black",
          });
        } else {
          $("#myCharacter").html(this);
        }
      });
      clickCounter++;
    } else if (
      clickCounter === 1 &&
      $(this).attr("data-myCaraktersID") !== "1"
    ) {
      $("#defender").addClass("d-none");
      $("#defenderContainer").append(this);
      $(this).css({
        "background-color": "black",
        border: "3px solid green",
        color: "white",
      });
      clickCounter++;
    }
  });
});
