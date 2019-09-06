$(document).ready(function() {
	var player = [];
	var resources = {
						'food':{'count':0, 'show':true},
						'water':{'count':0, 'show':true},
						'medical':{'count':0, 'show':false},
						'weapon':{'count':0, 'show':false},
						'ammo':{'count':0, 'show':false},
						'wood':{'count':0, 'show':false},
						'stone':{'count':0, 'show':false},
						'iron':{'count':0, 'show':false},
						'survivor':{'count':0, 'show':false},
						'gold':{'count':0, 'show':false}
					};
					
	function init() {
		stats();
	}
	
	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	}

	function stats() {
		$("#stats").html("");
		$.each( resources, function( i, val ) {
			if (val.show==true) {
				$("#stats").append(i+': <span id="res_'+i+'">'+val.count+'</span><br/>');
			}
		});
	}
	
	$( "#garbage" ).click(function() {
		$(this).progressTimed(1);
		$(this).on('progress-finish', function() {
			if (getRndInteger(1,6) < 4) resources.food.count ++;
			else resources.water.count ++;
			
			$(this).off('progress-finish');
		});
	});
	
	init();
	window.setInterval(function(){stats()}, 100);
});
