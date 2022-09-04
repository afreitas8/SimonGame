var buttonColors = ["red", "blue", "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var wrong = "false";

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    //alert(randomChosenColor);

    $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

$(".btn").click( function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    
    
});

function playSound(name){
    var clickAudio = new Audio("sounds/" + name + ".mp3");
    clickAudio.play();
}

function animatePress(currentColor){
    $(currentColor).ready(function(){
        $("."+currentColor).addClass("pressed");
        setTimeout(function(){
            $("."+currentColor).removeClass("pressed");
        }, 100);
    });
}

$(document).keypress(function(){
    if(level === 0){
        nextSequence();
    }
    if(level > 0 && wrong === true){
        startOver();
    }
});

function checkAnswer(level){
    if(gamePattern[level] === userClickedPattern[level]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },
            1000);
        }

    } else {
        gameOver();
        console.log("wrong");
    }
}

function gameOver() {
    wrong = true;
    var overAudio = new Audio("sounds/wrong.mp3");
    overAudio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver(){
    level = 0;
    gamePattern = [];
    setTimeout(function() {
        nextSequence()
    }, 300);
}

