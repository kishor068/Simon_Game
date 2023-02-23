buttonColours=["red", "blue", "green", "yellow"];
var randomChoosenColor;
var gamePattern=[];
userClickedPattern=[];
var level=0;
var start=false;
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  randomChoosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChoosenColor);
  
 
  // console.log(randomNumber);
  console.log(gamePattern);
  playSound(randomChoosenColor);
  animatePress(randomChoosenColor);
}

// $("h1").click(nextSequence);

$(document).keypress(function()
{
  if(!start)
  {
    $("h1").text("Level "+level);
    
  nextSequence();
  start=true;
  }
})

$("button").click(function()
{
  var userChosedColor=$(this).attr("id");
  // $("#"+userChosedColor).fadeOut().fadeIn(); 
    playSound(userChosedColor); 
     userClickedPattern.push(userChosedColor);
     console.log(userClickedPattern); 
     animatePress(userChosedColor);   

     checkAnswer(userClickedPattern.length-1);
});


function playSound(sound)
{
  switch (sound) {
    case "red":var aud=new Audio("sounds/red.mp3");
    aud.play();
      break;
      case "green":var aud=new Audio("sounds/green.mp3");
      aud.play();
      break;
      case "blue":var aud=new Audio("sounds/blue.mp3");
      aud.play();
      break;
      case "yellow":var aud=new Audio("sounds/yellow.mp3");
      aud.play();
      break;

    default:console.log("invalid");
      break;
  }
}


function animatePress(currentcolor)
{
  $("#"+currentcolor).addClass("pressed");
  $("#"+currentcolor).fadeOut().fadeIn();
  setTimeout(function()
  {
    $("#"+currentcolor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
  if(userClickedPattern.length==gamePattern.length)
  {

  
    setTimeout(nextSequence,1000);
  }
  }
else
{
  console.log("wrong");
  var wrongAudio=new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  $("body").addClass("wrong");
  $("h1").text("Game Over,Press any key to reset");
  setTimeout(function()
  {
   $("body").removeClass("wrong");
  },200);
   startover();

}
 
  
}

function startover()
{
  level=0;
  gamePattern=[];
  start=false;
}