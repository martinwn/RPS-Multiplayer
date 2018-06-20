// Initialize Firebase

  var config = {
    apiKey: "AIzaSyAJEvSjrrHgGP4gT8hYGzC6ct1YkVBRWIk",
    authDomain: "rps-player.firebaseapp.com",
    databaseURL: "https://rps-player.firebaseio.com",
    projectId: "rps-player",
    storageBucket: "rps-player.appspot.com",
    messagingSenderId: "46206444329"
  };
  firebase.initializeApp(config);

// Global Variables

  var database = firebase.database();
  var player1Name = "";
  var player1Wins = 0;
  var player1Losses = 0;
  var player1Choice = "";
  var player2Name = "";
  var player2Wins = 0;
  var player2Losses = 0;
  var player2Choice = "";
  var clickCount = 0;



// On Click Event

  $("#start-button").on("click", function() {
  
    event.preventDefault();

    if (clickCount === 0) {
      
      player1Name = $("#name-input").val().trim();

      database.ref("Players").child(1).set({
        name:player1Name, wins:player1Wins, losses:player1Losses
      });

    } else if (clickCount === 1) {

      player2Name = $("#name-input").val().trim();

      database.ref("Players").child(2).set({
        name:player2Name, wins:player2Wins, losses:player2Losses
      })

    }
    
  });


// Database Reference

    database.ref("Players").child("1/name").on("value", function(childSnapshot, prevChildKey) {
      
      if (childSnapshot.val() === null) {
        
        $("#player-1-name").text("Waiting for Player 1");  

      } else {

      clickCount++;
      
      player1Name = childSnapshot.val();

      $("#player-1-name").text(player1Name); 
      
      }

    }, function(errorObject) {

      console.log("The read failed: " + errorObject.code);

    });

    database.ref("Players").child("2/name").on("value", function(childSnapshot, prevChildKey) {

      if (childSnapshot.val() === null) {

        $("#player-2-name").text("Waiting for Player 2");

      } else {

        
        player2Name = childSnapshot.val();

        $("#player-2-name").text(player2Name);

        database.ref().update({
          turn:1
        })

      }

    }, function(errorObject) {

      console.log("The read failed: " + errorObject.code);

    });

  database.ref().child("turn").on("value", function(childSnapshot, prevChildKey) {

    if (childSnapshot.val() === 1) {

      var choice11 = $("<p id='rock1'>").text("Rock")
      var choice12 = $("<p id='paper1'>").text("Paper")
      var choice13 = $("<p id='scissors1'>").text("Scissors")
      var choiceContainer = $("<div id='choice-container'>")
      
    
      $("#player-1-container").append(choiceContainer);

      $("#choice-container").append(choice11, choice12, choice13);

      $(document).on("click", "#rock1", function() {
        database.ref("Players").child("1").update({
          choice:"rock"
        })
        database.ref().update({
          turn:2
        })
        $("#choice-container").remove();
      })

      $(document).on("click", "#paper1", function() {
        database.ref("Players").child("1").update({
          choice:"paper"
        })
        database.ref().update({
          turn:2
        })
      })

      $(document).on("click", "#scissors1", function() {
        database.ref("Players").child("1").update({
          choice:"scissors"
        })
        database.ref().update({
          turn:2
        })
      })
    }

    if (childSnapshot.val() === 2) {
      var choice21 = $("<p id='rock2'>").text("Rock")
      var choice22 = $("<p id='paper2'>").text("Paper")
      var choice23 = $("<p id='scissors2'>").text("Scissors")

      $("#player-2-container").append(choice21, choice22, choice23);
    }

    $(document).on("click", "#rock2", function() {
      database.ref("Players").child("2").update({
        choice:"rock"
      })
      database.ref().update({
        turn:3
      })
    })
    $(document).on("click", "#paper2", function() {
      database.ref("Players").child("2").update({
        choice:"paper"
      })
      database.ref().update({
        turn:3
      })
    })
    $(document).on("click", "#scissors2", function() {
      database.ref("Players").child("2").update({
        choice:"scissors"
      })
      database.ref().update({
        turn:3
      })
    })

    if (childSnapshot.val() === 3) {
      if (player1Choice === player2Choice) {
        var comparisonTie = $("<p id='tie'>").text("Tie Game");
        $("#game-container").append(comparisonTie);
        database.ref().update({
          turn:1
        })
      }
      if (player1Choice === "rock" & player2Choice === "paper") {
        var comparison2 = $("<p id='comparison-2'>").text(player2Name + " wins!")
        $("#game-container").append(comparison2);
      }
      if (player1Choice === "rock" & player2Choice === "scissors") {
        var comparison3 = $("<p id='comparison-3'>").text(player1Name + " wins!")
        $("#game-container").append(comparison3);
      }
      if (player1Choice === "paper" & player2Choice === "rock") {
        var comparison4 = $("<p id='comparison-4'>").text(player1Name + " wins!")
        $("#game-container").append(comparison4);
      }
      if (player1Choice === "paper" & player2Choice === "scissors") {
        var comparison5 = $("<p id='comparison-5'>").text(player2Name + " wins!")
        $("#game-container").append(comparison5);
      }
      if (player1Choice === "scissors" & player2Choice === "rock") {
        var comparison6 = $("<p id='comparison-6'>").text(player2Name + " wins!")
        $("#game-container").append(comparison6);
      }
      if (player1Choice === "scissors" & player2Choice === "paper") {
        var comparison7 = $("<p id='comparison-7'>").text(player1Name + " wins!")
        $("#game-container").append(comparison7);
      }
    }



  })

  database.ref("Players").child("1/choice").on("value", function(snapshot) {
    player1Choice = snapshot.val();
    console.log(player1Choice);
  })
  database.ref("Players").child("2/choice").on("value", function(snapshot) {
    player2Choice = snapshot.val();
    console.log(player2Choice);
  })
  console.log(player1Choice);
  console.log(player2Choice);


  

  console.log(clickCount);

  // Form Validator

    $("form").validator();

/* Pseudo-code:
There's still a lot I would need to accomplish. First off, I would need to add elements like 
win/loss counters, comment section, etc. I would then need to fix the display of elements so 
that to each player certain things would be shown (like rock-paper-scissor choice) and 
others hidden. I would also have to add reset funtionality to the end of each match, and also
on a player leaving a game. 
*/
