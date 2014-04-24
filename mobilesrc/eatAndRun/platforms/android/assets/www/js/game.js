/*Decreasing progress bar*/

function decrease(dec) {
    var gw = $('.greenbar').width();
    var rw = $('.redbar').width();
    var perc = (gw / rw) * 100;
    if (perc >= 0 + dec) {
        var perc = perc - dec;
        avatarSpeed(perc);
    }
    else {
        perc = 0;
    }
    $('.greenbar').css('width', perc + "%");
    console.log("width: " + perc);
}


function increase(inc) {
    var rw = $('.redbar').width();
    var gw = $('.greenbar').width();
    var perc = (gw / rw) * 100;
    if (perc <= 100 - inc) {
        var perc = perc + inc;
        avatarSpeed(perc);
    }
    else {
        perc = 100;
    }
    $('.greenbar').css('width', perc + "%");
    console.log("Width: " + perc);
}


/**
 * Create new food object
 * @param healthValue - numerical represent change in point value when eaten
 * @param lane - boolean whether fruit is in top or bottom lane
 * @constructor
 */
function Food(params) {
    this.name = params.name;
    this.healthValue = params.healthValue;
    this.id = null;
}

Food.prototype.renderFood = function () {
    if (this.isInBottomLane) {
        $("body").append('<div class="fruitContainer bottomLane"></div>');
    } else {
    }

}

function Game(horizontalDelta) {
    this.horizontalDelta = horizontalDelta;
    this.foodList = [];
    this.score=0;
}

function Avatar(isInBottomLane) {
    this.isInBottomLane = isInBottomLane;
}

Avatar.prototype.moveToTopLane = function () {
    $("#avabox").animate({"bottom": "125px"});
    $("#lunchbox").animate({"bottom": "125px"}, 'slow');
    this.isInBottomLane = false;
}

Avatar.prototype.moveToBottomLane = function () {
    $("#avabox").animate({"bottom": "3px"});
    $("#lunchbox").animate({"bottom": "3px"}, 'slow');
    this.isInBottomLane = true;
}

var background_position = 0;
var avatar_edge = 108;
function move_background() {
    background_position = background_position - game.horizontalDelta;
    $('body').css("background-position-x", background_position);
    for(var idx = 0; idx < game.foodList.length; idx++){
        var selector = "food" + game.foodList[idx].id;
        move_food(selector, idx);
    }
}

var nextId = 10;
function addNewFood() {
    var foodIdx = Math.floor(Math.random() * 16) + 1;
    var food = new Food(foodMap[foodIdx]);
    food.id = nextId++;
    game.foodList.push(food);
    var $el = $('<img class="food" src="img/sm'+foodMap[foodIdx].name+'.png" id="food'+food.id+'">');
    switchLanes($el, food.id)
    $('.main-content').append($el);
}

//the selector id for the element, index of the food
//in the food list
function move_food(id, idx) {
    $("#" + id).css({"right": "+=" + game.horizontalDelta});
    //hit test for food+avatar 
    var food =$("#"+id);
    var left_offset = $("#" + id).offset().left;
    var foodposition=food.offset();
    var foodwidth=food.width();
    var foodheight=food.height();
    var foodleft=foodposition.left;
    var foodtop=foodposition.top;
    var foodright=foodleft+foodwidth;
    var foodbottom=foodtop+foodheight;

	var lunchlady =$("#lunchbox");
	var lunchpos=lunchlady.offset();
	var lunchwid=lunchlady.width();
	var lunchhgt=lunchlady.height();
	var lunchlft=lunchpos.left;
	var lunchtop=lunchpos.top;
	var lunchrt=lunchlft+lunchwid;
	var lunchbot=lunchtop+lunchhgt;
    
    var avatar =$("#avabox");
    var avatarposition=avatar.offset();
    var avatarwidth=avatar.width();
    var avatarheight=avatar.height();
    var avatarleft=avatarposition.left;
    var avatartop=avatarposition.top;
    var avatarright=avatarleft+avatarwidth;
    var avatarbottom=avatartop+avatarheight;

    if (foodright>avatarleft && 
    foodbottom>avatartop &&
    foodtop<avatarbottom &&
    foodleft<avatarright)
    {   
   // if (left_offset < avatar_edge) {
        //clearInterval(tickinterval);
        adjustNB(game.foodList[idx].healthValue);
        game.score += game.foodList[idx].healthValue;
        game.foodList.splice(idx, 1);
        console.log("foodhit");
        $("#" + id).remove();
        addNewFood();
        console.log("score"+game.score);
        $("#score").html("SCORE: " + game.score);
    }
	
	if (lunchrt>avatarleft && 
		lunchbot>avatartop &&
		lunchtop<avatarbottom &&
		lunchlft<avatarright)
		{console.log("lunchhit");
		clearInterval(ticker); 
        window.localStorage.setItem("score", game.score);
        document.location.href="endscreen.html";}
		
}




function adjustNB(hVal)
{
    var chg = Math.ceil(Math.abs((hVal/DIVIDEND) * 100));
    
    if(hVal < 0)
    {
        decrease(chg);
        console.log(chg);
    }
    else if (hVal > 0)
    {
        increase(chg);
        console.log(chg);
    }

}


//switchLanes with a food object and food position as
//arguments. Will randomly place a food object onto
//the top or bottom lane. 
function switchLanes(foodObj, i)
{
    var laneID = Math.floor(Math.random() * 2) + 1;

    switch(laneID)
         {
            case 1:
             $(foodObj).css({"bottom": 150, "right": -(i * 88)});
             break;
            case 2:
             $(foodObj).css({"bottom": 0, "right": -(i * 88)});
             break;
         }
}


//avatarSpeed function with current nutrition bar red/green ratio
//as NBperc. Will move the avatar at certain points on the nutrition
//bar.
function avatarSpeed(NBperc)
{

       if (NBperc >= 0 && NBperc < 10)
        {
            $("#avabox").animate({"right": "85%"}, 2000);
        }    
        else if (NBperc > 20 && NBperc <= 30)
        {
         $("#avabox").animate({"right": "65%"}, 2000);
        }
        else if (NBperc > 45 && NBperc <= 55)
        {
             $("#avabox").animate({"right": "45%"});
        } 
        else if (NBperc > 70 && NBperc <= 80)
        {
              $("#avabox").animate({"right": "25%"}, 1000);
        }
        else if(NBperc >= 90 && NBperc <= 100)
         {
            $("#avabox").animate({"right": "5%"}, 1000);
         }
        else
            return;
}

$(function () {

});
/**
 * Append a fruit to the body
 */

var tickinterval;
var game;
var avatar;
var DIVIDEND = 1600;
//images on foodmap coorelate with name//
var foodMap = {
    1: {name: "Pizza", healthValue: -80},
    2: {name: "Burger", healthValue: -80},
    3: {name: "Chicken", healthValue: 20},
    4: {name: "Pop", healthValue: -160},
    5: {name: "Candy", healthValue: -160},
    6: {name: "Tomato", healthValue: 80},
    7: {name: "Icecream", healthValue: -80},
    8: {name: "Broccoli", healthValue: 80},
    9: {name: "Lettuce", healthValue: 40},
    10: {name: "Punch", healthValue: 40},
    11: {name: "Eggs", healthValue: 40},
    12: {name: "Milk", healthValue: 40},
    13: {name: "Cheese", healthValue: 20},
    14: {name: "Celery", healthValue: 40},
    15: {name: "Banana", healthValue: 40},
    16: {name: "Peanuts", healthValue: 20}
    };


$(document).ready(function () {
    game = new Game(1);
    avatar = new Avatar(true);
    tickinterval = setInterval(move_background, 6);
//run 10 times from 0 to 9
     for(var i = 0; i<10; i++){
         //generate random item between 1 and 16
         var foodIdx = Math.floor(Math.random() * 16) + 1;
         //var laneID = Math.floor(Math.random() * 2) + 1;
         //get random item from foodmap and store in foodParam
         var foodParams = foodMap[foodIdx];
         //create new food object using random item 
         var food = new Food(foodParams);
         //tells food item slot/position it is in
         food.id = i;
         //adding food to array of items that will appear
         game.foodList.push(food);
         //generating img tag for food
         var $el = $('<img class="food" src="img/sm'+ foodParams.name +'.png" id="food'+i+'">');
         //position items on the bottom track off screen based on id number
        switchLanes($el, i);
         //takes image and puts onto html
         $('.main-content').append($el);
     }

    $("body").click(function (event) {
        if (event.clientY > $(document).height() / 2) {
            //bottom half clicked move avatar down
            avatar.moveToBottomLane();
        } else {
            //top half
            avatar.moveToTopLane();
        }

    });
    /* var food = new Food(10, true);
     food.renderFood();*/
})

    /*Decreasing timer*/
	
/*author Philip M. 2010*/

$(function() {
var timeInSecs;
var ticker;
var remSecs;

function startTimer(secs){
timeInSecs = parseInt(secs)-1;
ticker = setInterval(tick,1000);   // every second
}

function tick() {
var secs = timeInSecs;
if (secs>0) {
timeInSecs--;
}
else {
clearInterval(ticker); // stop counting at zero
// startTimer(60);  // remove forward slashes in front of startTimer to repeat if required
//calling end screen
document.location.href = decideCurrentCoachDocument();
window.localStorage.setItem("score", game.score);
document.location.href="endscreen.html";

}


document.getElementById("tick").innerHTML = secs;
}

startTimer(60);  // 60 seconds 

//Click event for pause button. Remaining time on timer will
//be stored in remSecs and the timer will stop.
$("#pauseB").click(function(){
          remSecs = timeInSecs + 1;
          clearInterval(ticker);});

//Click event for resume button on pause menu. Remaining time stored
//in remSecs is used to restart the timer.
$("#close").click(function(){
          startTimer(remSecs);});
});
//functions for coaches
function isNumber(value) {
        return typeof value === 'number';
}

function isntNumber(value) {
        return typeof value !== 'number';
}

function isNumberWithin(value, lowValue, highValue) {
        if (value < lowValue) { return false; }
        if (value > highValue) { return false; }
        return true;
//end functions for coaches


}

function checkIsValidPercentage(value) {
        if (isntNumber(value)) {
                new Error("value must be a number!");
                return false;
        }
        if (isNumberWithin(value, 0, 100)) { return true; }
        new Error("value must be within 0 to 100 to be a percentage!");
        return false;
}

function isPercentageWithin(value, lowValue, highValue) {
        checkIsValidPercentage(value);
        return isNumberWithin(value, lowValue, highValue);
}


function decideCurrentCoachDocument(healthPercentageValue) {
       /* if (!isIncludedBetween(healthPercentageValue, 0, 100)) {
                new Error("healthPercentageValue must be ")
        }*/
        if (isPercentageWithin(healthPercentageValue, 0, 39)) {
                endScreenDocument = "endscreen_coach2.html";
        } else if (isPercentageWithin(healthPercentageValue, 40, 60)) {
                endScreenDocument = "endscreen_coach1.html";
        } else (isPercentageWithin(healthPercentageValue, 61, 100)) 
                endScreenDocument = "endscreen_coach3.html";
        
        return endScreenDocument;
		}
