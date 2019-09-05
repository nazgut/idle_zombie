$(document).ready(function() {
	var player = [];
	var resources = {
						'gold':{'count':0, 'show':true},
						'food':{'count':0, 'show':true},
						'water':{'count':0, 'show':true},
						'medical':{'count':0, 'show':false},
						'weapon':{'count':0, 'show':false},
						'ammo':{'count':0, 'show':true},
						'wood':{'count':0, 'show':true},
						'stone':{'count':0, 'show':true},
						'iron':{'count':0, 'show':true}
					};
	function init() {
		$("#stats").html("");
		$.each( resources, function( i, val ) {
			if (val.show==true) {
				$("#stats").append(i+': <span id="res_'+i+'">'+val.count+'</span><br/>');
			}
		});
	}
	
	$( "#garbage" ).click(function() {
		resources.gold.count ++;
	});
	
	init();
	window.setInterval(function(){init()}, 60);
});
