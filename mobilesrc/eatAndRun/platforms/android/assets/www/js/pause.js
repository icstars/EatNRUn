// Begin Pause
$(document).ready(function(){
    // show popup when you click on the link
    $('.show-popup').click(function(event){
        // event.preventDefault(); // disable normal link function so that it doesn't refresh the page
        var docHeight = $(document).height(); //grab the height of the page
        var scrollTop = $(window).scrollTop(); //grab the px value from the top of the page to where you're scrolling
        $('.overlay-bg').show().css({'height' : docHeight}); //display your popup and set height to the page height
        $('.overlay-content').css({'top': scrollTop+20+'px'}); //set the content 20px from the window top
		pause(); // pause the game
        event.stopPropagation(); //stop any further action after initial on click action.
		});
 
    // hide popup when user clicks on close button
    $('#close').click(function(){
        $('.overlay-bg').hide(); // hide the overlay
		start();
    });
 
    // hides the popup if user clicks anywhere outside the container
    $('.overlay-bg').click(function(){
        $('.overlay-bg').hide();
		start();
    })
    // prevents the overlay from closing if user clicks inside the popup overlay
    $('.overlay-content').click(function(){
        return false;
    });
	$("#resume").click(function(){
     window.location = "continue.html";    
	});
	$("#restart").click(function(){
     window.location = "game.html";    
	});
	$("#close").click(function(){
     window.location = "#";    
	});
});

function start() {
    //Start game
    tickinterval = setInterval(move_background, 15);
    ticker = setInterval(tick,1000);

}

function resume() {
    //Resume game from a paused

}

function pause() {
    clearInterval(tickinterval);
    //clearInterval(ticker);
}

function stop() {
    //Stop game

}

var ticker;
// End Pause

