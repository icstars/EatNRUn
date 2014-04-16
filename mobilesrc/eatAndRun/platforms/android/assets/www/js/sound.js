<script>
$(function() {	
	
	$( "#Slider2" ).slider({ 
		min: 0, 
		max: 100, 
		value: 1,
		slide: function() {
			document.getElementById("  ").volume = ($(this).slider("value")/100);
		}
	});

	$( "#Slider3" ).slider({ 
		min: 0, 
		max: 100, 
		value: 1,
		slide: function() {
			document.getElementById("  ").volume = ($(this).slider("value")/100);
		}
	});


	

});
</script>
