// NOTES

// $("body").css("background-color", "yellow");    // to change the body color using jQuery

// function nextSequence() {
//     var x = Math.random() * 10;
//     x += 1;
//     x = Math.floor(x);                   // sample detailed random number creation instead of the below shorter random num creation
//     return x;
// }

// necessary arrays and variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// keypress part
$(document).keypress(handlerForKeypress);

function handlerForKeypress() {
    if (!started) {
        $("h1").html("Level " + level);     // now with the if (!started) statement, I learned how to stop the second keypress calling the nextSequence function, coz started = true is blocking the second execution of the if statement.
        nextSequence();                   // first time running the nextSequence function to start the game
        started = true;
    }
}


// click part
$("button").click(handler);

function handler() {
    // $(this).hide();
    var userChosenColour = $(this).attr("class");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);     // to get the index of the last input pusehd to an array
}


// functions
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // $("." + randomChosenColor).css("background-color", "purple");    just an example
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("h1").html("Level " + level);   // now level = 1 is concatinated with "Level ", coz in above line the level is first increased by ++ operator
    userClickedPattern.length = 0;                                      // to empty the userClickedPattern array, so its length becomes zero
}


function playSound(name) {
    switch (name) {
        case "red":
            var sound = new Audio("./sounds/red.mp3");
            sound.play();
            break;
        case "blue":
            var sound = new Audio("./sounds/blue.mp3");
            sound.play();
            break;
        case "green":
            var sound = new Audio("./sounds/green.mp3");
            sound.play();
            break;
        case "yellow":
            var sound = new Audio("./sounds/yellow.mp3");
            sound.play();
            break;
        case "wrong":
            var sound = new Audio("./sounds/wrong.mp3");
            sound.play();
    }

    // var sound = new Audio("./sounds/" + name + ".mp3");     another way making the sound but it does not have default option which should make default sound.
    // sound.play();
}


function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(waitFor100m, 100);
    function waitFor100m() {
        $("." + currentColor).removeClass("pressed");
    }
}


// game logic function
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {        // to check user clicked array length is equal to randomly input chosen array
            setTimeout(function () {
                nextSequence();              // second time running the nextSequence function after 1000 milliseconds
            }, 1000);              
            // console.log("success " + gamePattern[currentLevel] + " and " + userClickedPattern[currentLevel]);
        }
    } else {
        playSound("wrong");
        // console.log("wrong " + gamePattern[currentLevel] + " and " + userClickedPattern[currentLevel]);
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over"); }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver() {
    level = 0;
    started = false;
    gamePattern = [];           // to empty the gamePattern array
}