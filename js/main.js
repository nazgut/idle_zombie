$(document).ready(function() {
	var Game = {};
	
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
					
	Game.init = function() {
		Game.loadFile();
		Game.stats();
	};
	
	Game.saveFile = function(){
		var file = {
			food: resources.food.count,
			water: resources.water.count
		};
		localStorage.setItem('saveFile',JSON.stringify(file));
	};

	Game.loadFile = function(){
		var file = JSON.parse(localStorage.getItem('saveFile'));
		resources.food.count = file.food;
		resources.water.count = file.water;
	};
	
	Game.getRndInteger = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	};

	Game.stats = function() {
		$("#stats").html("");
		$.each( resources, function( i, val ) {
			if (val.show==true) {
				$("#stats").append(i+': <span id="res_'+i+'">'+val.count+'</span><br/>');
			}
		});
	};
	
	$( "#garbage" ).click(function() {
		$(this).progressTimed(1);
		$(this).on('progress-finish', function() {
			if (Game.getRndInteger(1,6) < 4) resources.food.count ++;
			else resources.water.count ++;
			
			$(this).off('progress-finish');
		});
	});
	
	Game.init();
	window.setInterval(function(){Game.stats()},100);
	window.setInterval(function(){Game.saveFile()},5000);
});
