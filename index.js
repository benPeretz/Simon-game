

const buttonColor=["red","blue","green","yellow"];// all the buttons

var userClickedPattern=[];//array to remember the user click buttons
var gamePattern=[];// game's array  
var level=0;
var playing=false;


$("body").on("keypress",function(){
    if(playing===false){
        nextSequence();
        $("#level-title").text("Level "+level);
        playing=true;
        
    }

});


function checkAnswer(currentColor){

    var flagAnswer=0;//2 -->user succed the all level. 1 -->the user succed in this step. 0--> the user failed.

    if(userClickedPattern.length===gamePattern.length){

        if(gamePattern[gamePattern.length-1]===userClickedPattern[userClickedPattern.length-1]){
            console.log("sucsses");
            flagAnswer=2;
            return flagAnswer;
        }
        else{
            console.log("wrong");
            flagAnswer=0;
            return flagAnswer;
        }

    }else if(gamePattern[userClickedPattern.length-1]!==userClickedPattern[userClickedPattern.length-1]){
        console.log("wrong");
        flagAnswer=0;
        return flagAnswer;
    }
    else {
        flagAnswer=1;
        return flagAnswer;
    }
    



}


$(".btn").on("click",function(){

    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
   // $("#"+userChosenColor).fadeOut(50).fadeIn(50);
    console.log("user array = "+userClickedPattern);
    makeSound(this.id);
    animatePress(this.id);

    var answer=checkAnswer(userClickedPattern);

    if(answer===2){
        setTimeout(function(){
        

            iterateUserClickedPattern(0)
            .then(function(){
                setTimeout(function(){

                    nextSequence();
                },500);
            })
            
       
    
        },1000);
    }



});


// הפרומיס במקרה שלך מופעל כאשר הלולאה שבתוך iterateUserClickedPattern מסתיימת לרוץ (ברקורסיה) ומבטיח שכאשר כל האנימציות והצלילים הושלמו (כלומר, כאשר index הוא מספר גדול או שווה לאורך המערך userClickedPattern), הוא יבצע את הפעולות שנמצאות ב-.then שבקוד הראשי. 

// כלומר, הפרומיס וה-resolve מאפשרים לך לפקוח את הקוד לפרטים שקורים אסינכרונית ולבצע פעולות נוספות (במקרה שלך, להתחיל את nextSequence) רק לאחר שכל האנימציות והצלילים הושלמו. 

function iterateUserClickedPattern(index) {
    return new Promise(function(resolve) {
      function iterate() {
        if (index < userClickedPattern.length) {
          setTimeout(function() {
            $("#" + userClickedPattern[index]).fadeOut(50).fadeIn(50);
            makeSound(userClickedPattern[index]);
            index++;
            iterate();
          }, 400);
        } else {
          resolve(); // הפרומיס מופעל כאשר הלולאה מסתיימת
        }
      }
  
      iterate();
    });
  }



//random number between 0-3
function nextSequence(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(50).fadeIn(50); 
    makeSound(randomChosenColor);
   
    console.log("randomChosenColor  ="+randomChosenColor);


    console.log("game array = "+gamePattern);

}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

}
function makeSound(colorBtn){
    var sound=new Audio("sounds/"+colorBtn+".mp3");
    sound.play();

}





