/*Decreasing progress bar*/

function decrease(dec) {
    var gw = $('.greenbar').width();
    var rw = $('.redbar').width();
    var perc = (gw / rw) * 100;
    if (perc >= 0 + dec) {
        var perc = perc - dec;
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
}

function Avatar(isInBottomLane) {
    this.isInBottomLane = isInBottomLane;

}

Avatar.prototype.moveToTopLane = function () {
    $(".avatarContainer").animate({"bottom": "100px"});
    this.isInBottomLane = false;
}

Avatar.prototype.moveToBottomLane = function () {
    $(".avatarContainer").animate({"bottom": "0px"});
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
    var fruitIdx = Math.floor(Math.random() * 17) + 1;
    var foodParams = foodMap[fruitIdx];
    var food = new Food(foodParams);
    food.id = nextId++;
    game.foodList.push(food);
    var $el = $('<img class="food" src="img/sm'+foodMap[fruitIdx].name+'.png" id="food'+food.id+'">');
    $el.css({"bottom": 0, "right": 0});
    $('.main-content').append($el);
}

//the selector id for the element, index of the food
//in the food list
function move_food(id, idx) {
    $("#" + id).css({"right": "+=" + game.horizontalDelta});
    var left_offset = $("#" + id).offset().left;
    if (left_offset < avatar_edge) {
        //clearInterval(tickinterval);
        game.foodList.splice(idx, 1);
        $("#" + id).remove();
        addNewFood();
    }
}

$(function () {

});
/**
 * Append a fruit to the body
 */

var tickinterval;
var game;
var avatar;
//images on foodmap coorelate with name//
var foodMap = {
    1: {name: "Pizza", healthValue: -40},
    2: {name: "Burger", healthValue: -20},
    3: {name: "Chicken", healthValue: -20},
    4: {name: "Pop", healthValue: -20},
    5: {name: "Candy", healthValue: -20},
    6: {name: "Tomato", healthValue: -20},
    7: {name: "Icecream", healthValue: -20},
    8: {name: "Broccoli", healthValue: 20},
    9: {name: "Lettuce", healthValue: 20},
    10: {name: "Punch", healthValue: 20},
    11: {name: "Eggs", healthValue: 20},
    12: {name: "Milk", healthValue: 20},
    13: {name: "Cheese", healthValue: 20},
    14: {name: "Celery", healthValue: 20},
    15: {name: "Banana", healthValue: 20},
    16: {name: "Peanuts", healthValue: 20}
    };


$(document).ready(function () {
    game = new Game(1);
    avatar = new Avatar(true);
    tickinterval = setInterval(move_background, 15);
     for(var i = 0; i<10; i++){
         var fruitIdx = Math.floor(Math.random() * 16) + 1;
         var foodParams = foodMap[fruitIdx];
         var food = new Food(foodParams);
         food.id = i;
         game.foodList.push(food);
         var $el = $('<img class="food" src="img/sm'+ foodParams.name +'.png" id="food'+i+'">');
         $el.css({"bottom": 0, "right": -(i * 88)});
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
