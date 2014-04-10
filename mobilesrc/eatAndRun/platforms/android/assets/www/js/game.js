/*Decreasing progress bar*/

function decrease(dec)
{
	var gw = $('.greenbar').width();
	var rw = $('.redbar').width();
	var perc = (gw/rw) * 100;
	if(perc >= 0+dec){
	   var perc = perc - dec;
	}
	else{
		perc = 0;
	}
$('.greenbar').css('width', perc+"%");
	console.log("width: " + perc);
}


function increase(inc)
{
	var rw = $('.redbar').width();
	var gw = $('.greenbar').width();
	var perc = (gw / rw) * 100;
	if (perc <= 100-inc){
		var perc = perc + inc;
	}
	else{
		perc = 100;
	}
	$('.greenbar').css('width', perc+"%");
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
}

Food.prototype.renderFood = function() {
    if (this.isInBottomLane){
        $("body").append('<div class="fruitContainer bottomLane"></div>');
    } else {}

}

function Game(horizontalDelta) {
    this.horizontalDelta = horizontalDelta;
    this.foodList = [];
}

function Avatar(isInBottomLane) {
    this.isInBottomLane = isInBottomLane;

}

Avatar.prototype.moveToTopLane = function() {
    $(".avatarContainer").animate({"bottom" : "100px"});
    this.isInBottomLane = false;
}

Avatar.prototype.moveToBottomLane = function () {
    $(".avatarContainer").animate({"bottom": "0px"});
    this.isInBottomLane = true;
}

var background_position = 0;
var avatar_edge = 108;
function move_background()
{
	background_position = background_position - game.horizontalDelta;
	$('body').css("background-position-x", background_position);
    $(".fruitContainer").css({"right": "+="+game.horizontalDelta});
    var left_offset = $(".fruitContainer").offset().left;
    if( left_offset < avatar_edge) {
        clearInterval(tickinterval);
        $(".fruitContainer").remove();
    }

}

$(function(){

});
/**
 * Append a fruit to the body
 */

var tickinterval;
var game;
var avatar;

var fruitMap = {0: {name: "Broccoli", healthValue: 20},
                1: {name: "Carrot", healthValue: 20},
                2: {name: "Pizza", healthValue: 40},
                3: {name: "Beer", healthValue: -20}};


$(document).ready(function () {
    game = new Game(1);
    avatar = new Avatar(true);
   // tickinterval = setInterval(move_background, 15);
    for(var i = 0; i<10; i++){
        var fruitIdx = Math.floor(Math.random() * 4);
        var food = new Food(fruitMap[fruitIdx]);
        game.foodList.push(food);
    }
    $("body").click( function (event) {
        if ( event.clientY > $(document).height() /2 ){
            //bottom half clicked move avatar down
            avatar.moveToBottomLane();
        } else {
            //top half
            avatar.moveToTopLane();
        }

    });
    var food = new Food(10, true);
    food.renderFood();
})
