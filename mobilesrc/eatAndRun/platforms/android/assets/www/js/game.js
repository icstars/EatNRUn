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
var isUpdatingUI = false;
function move_background() {
    if (isUpdatingUI) {
        return;
    }
    isUpdatingUI = true;
    background_position = background_position - game.horizontalDelta;
    $('body').css("background-position-x", background_position);
    /*$("#cheese").css({"right": "+="+game.horizontalDelta});
     var left_offset = $("#cheese").offset().left;
     if( left_offset < avatar_edge) {
     clearInterval(tickinterval);
     $("#cheese").remove();

     }*/

    /* Refactor move_food so it doesn't rely on hardcoded food names,
     but instead moves all the food that's currently on the page */
    /*$cheese = $('<img src="cheese.jpg" id="cheese" class="food"/>
     foodList = [$cheese, $peanuts]

     tickInterval (function defintion) {
     if current_tick%10 == 2
     $('#foodContainer').append(foodList.rand());
     }*/
   /* if ($('#cheese').length) {
        move_food("cheese");
    }
    ;
    if ($('#celery').length) {
        move_food("celery");
    }
    ;
    if ($('#pop').length) {
        move_food("pop");
    }
    ;
    if ($('#hamburger').length) {
        move_food("hamburger");
    }
    ;
    if ($('#chicken').length) {
        move_food("chicken");
    }
    ;
    if ($('#milk').length) {
        move_food("milk");
    }
    ;*/
    for(var idx = 0; idx < game.foodList.length; idx++){
        //$("#food"+food.id).css({"right": "+="+ game.horizontalDelta});
        var selector = "food" + game.foodList[idx].id;
        move_food(selector, idx);
    }
    isUpdatingUI = false;
}

var nextId = 10;
function addNewFood() {
    var fruitIdx = Math.floor(Math.random() * 17) + 1;
    var foodParams = foodMap[fruitIdx];
    var food = new Food(foodParams);
    food.id = nextId++;
    game.foodList.push(food);
    var $el = $('<img class="food" src="'+foodMap[fruitIdx].imgSrc+'" id="food'+food.id+'">');
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

var foodMap = {1: {name: "Pizza", healthValue: -40, imgSrc:"img/smcheese.png"},
    2: {name: "Hamburger", healthValue: -20, imgSrc:"img/smburger.png"},
    3: {name: "Chicken", healthValue: -20, imgSrc:"img/smchicken.png"},
    4: {name: "Soda", healthValue: -20, imgSrc:"img/smcheese.png"},
    5: {name: "Candy", healthValue: -20, imgSrc:"img/smcheese.png"},
    6: {name: "Chips", healthValue: -20, imgSrc:"img/smcheese.png"},
    7: {name: "Ice cream", healthValue: -20, imgSrc:"img/smcheese.png"},
    8: {name: "Broccoli", healthValue: 20, imgSrc:"img/smcheese.png"},
    9: {name: "Carrot", healthValue: 20, imgSrc:"img/smcheese.png"},
    10: {name: "Lettuce", healthValue: 20, imgSrc:"img/smcheese.png"},
    11: {name: "Fruit Punch", healthValue: 20, imgSrc:"img/smcheese.png"},
    12: {name: "Eggs", healthValue: 20, imgSrc:"img/smcheese.png"},
    13: {name: "Milk", healthValue: 20, imgSrc:"img/smmilk.png"},
    14: {name: "Cheese", healthValue: 20, imgSrc:"img/smcheese.png"},
    15: {name: "Celery", healthValue: 20, imgSrc:"img/smcelery.png"},
    16: {name: "Banana", healthValue: 20, imgSrc:"img/smcheese.png"},
    17: {name: "Peanuts", healthValue: 20, imgSrc:"img/smcheese.png"}};


$(document).ready(function () {
    game = new Game(1);
    avatar = new Avatar(true);
    tickinterval = setInterval(move_background, 15);
     for(var i = 0; i<10; i++){
         var fruitIdx = Math.floor(Math.random() * 17) + 1;
         var foodParams = foodMap[fruitIdx];
         var food = new Food(foodParams);
         food.id = i;
         game.foodList.push(food);
         var $el = $('<img class="food" src="'+foodMap[fruitIdx].imgSrc+'" id="food'+i+'">');
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
