$(document).ready(() => {
  let clickCounter = 0,
    myEnergy = 0,
    defenderEnergy = 0,
    myHealth = 0,
    defenderHealth = 0;
  $(document).on("click", ".carakters", function () {
    if (clickCounter === 0) {
      $(this).attr("data-Carakters", "1");
      $("#selectCharacter").addClass("d-none");
      $(".carakters").each(function () {
        if ($(this).attr("data-Carakters") !== "1") {
          $("#enemiesAvailable").addClass("d-none");
          $("#enemiesAvailableContainer").append(this);
          $(this).css({
            "background-color": "red",
            border: "1px solid black",
          });
        } else {
          $("#myCharacter").html(this);
        }
        myEnergy = $(".carakters p.carakterPower").first().html();
        myHealth = myEnergy;
      });
      clickCounter++;
    } else if (clickCounter === 1 && $(this).attr("data-Carakters") !== "1") {
      $(this).attr("data-Carakters", "2");
      $("#defender").addClass("d-none");
      $("#defenderContainer").append(this);
      $(this).css({
        "background-color": "black",
        border: "3px solid green",
        color: "white",
      });
      clickCounter++;
      defenderEnergy = $(".carakters p.carakterPower").last().html();
      defenderHealth = defenderEnergy;
    }
  });
  $(document).on("click", ".attackButton", function () {
    if (clickCounter >= 2 && myHealth > 0 && defenderHealth > 0) {
      myAttack();
      defenderAttack();
      shootGun(myAttack(), defenderAttack());
    }
  });
  function myAttack() {
    return Math.floor(myEnergy * Math.random()) / 2;
  }
  function defenderAttack() {
    return Math.floor(defenderEnergy * Math.random()) / 2;
  }
  function shootGun(shoot1, shoot2) {
    myHealth = myHealth - shoot2;
    defenderHealth = defenderHealth - shoot1;
    if (myHealth <= 0 && defenderHealth > 0) {
      $(".restart-button").addClass("d-block");
      $(".information2").html("You have been defeated...GAME OVER!!!");
      $(".information").html("");
    } else if (defenderHealth <= 0 && myHealth > 0) {
      $("#defenderContainer div.carakters").removeClass("d-inline-block");
      $("#defenderContainer div.carakters").addClass("d-none");
      $(".information").html(
        `You have defeated ${$(".carakters p.name-carakters")
          .last()
          .html()}, you can choose to fight another enemy.`
      );
      $(".information2").html("");
      setTimeout(() => {
        clickCounter = 1;
        $(".information2").html("");
        $(".information").html("");
      }, 3000);
    } else if (defenderHealth <= 0 && myHealth <= 0) {
      $(".information2").html("You both lost");
      $(".information").html("");
      $(".restart-button").addClass("d-block");
    } else {
      $(".information").html(
        `You attacked ${$(".carakters p.name-carakters")
          .last()
          .html()}, for ${shoot1} damage.`
      );
      $(".information2").html(
        `${$(".carakters p.name-carakters")
          .last()
          .html()}, attacked you back for ${shoot2} damage.`
      );
    }
    $(".carakters p.carakterPower").last().html(defenderHealth);
    $(".carakters p.carakterPower").first().html(myHealth);
  }
  $(".restart-button").on("click", () => {
    window.location.reload();
  });
});
