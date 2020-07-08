var gamePattern = [];
var userClickedPatern = [];
var level = 0;
var started = false;
var buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
];

function startOver(){
    gamePattern = [];
    userClickedPatern = [];
    level = 0;
    started = false;

}
function animationPress(currentColour) {
    $("#" + currentColour).toggleClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).toggleClass("pressed");
    }, 100);
}

function playSound(name) {
    var au = new Audio("sounds/" + name + ".mp3");
    au.play();
}

function nextSquence() {
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + level);
}


function checkAnswer(currentLevel) {
    console.log(gamePattern, userClickedPatern);
    if (gamePattern[currentLevel] == userClickedPatern[currentLevel]) {
        console.log("success!");
        if (userClickedPatern.length == gamePattern.length) {
            console.log(userClickedPatern.length, gamePattern.length);
            setTimeout(function () {
                nextSquence();
                userClickedPatern = [];
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);
        $("#level-title").html("Game Over! level: "+level+"<br>Press Any Key to Restart");
        startOver();
    }
}

$(".btn").click(function() {
    if (started) {
        userClickedPatern.push(this.id);
        playSound(this.id);
        animationPress(this.id);
        checkAnswer(userClickedPatern.length - 1);
    }
})

$(document).on("keypress", function(evt) {
    console.log(started);
    if (started==false) {
        nextSquence(level);
        started = true;
    }

})
