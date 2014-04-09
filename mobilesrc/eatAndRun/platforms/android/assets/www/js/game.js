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
























