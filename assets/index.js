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
    if (clickCounter >= 2) {
      myAttack();
      defenderAttack();
      shootGun(myAttack(), defenderAttack());
    }
  });
  function myAttack() {
    return Math.floor(myEnergy * Math.random());
  }
  function defenderAttack() {
    return Math.floor(defenderEnergy * Math.random());
  }
  function shootGun(shoot1, shoot2) {
    myHealth = myHealth - shoot2;
    defenderHealth = defenderHealth - shoot1;
    if (myHealth <= 0 && defenderHealth > 0) {
      $(".restart-button").addClass("d-block");
      $(".information2").html("You have been defeated...GAME OVER!!!");
      $(".information").html("");
    } else if (defenderHealth <= 0 && myHealth > 0) {
      $(".restart-button").addClass("d-block");
      $("#defenderContainer div.carakters").removeClass("d-inline-block");
      $("#defenderContainer div.carakters").addClass("d-none");
      $(".information").html(
        `You have defeated ${$(".carakters p.name-carakters")
          .last()
          .html()}, you can choose to fight another enemy.`
      );
      $(".information2").html("");
    } else if (defenderHealth <= 0 && myHealth <= 0) {
    } else {
      $(".information").html(
        `You attacked Luke Skywalker for ${shoot1} damage.`
      );
      $(".information2").html(
        `Luke Skywalker attacked you back for ${shoot2} damage.`
      );
    }
    $(".carakters p.carakterPower").last().html(defenderHealth);
    $(".carakters p.carakterPower").first().html(myHealth);
  }
});
