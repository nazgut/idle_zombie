$(document).ready(function() {
	var Game = {};
	
	var stats = {
					'calories':{'val':0, 'max':100},
					'dehydration':{'val':0, 'max':100},
					'speed':{'val':1, 'max':100}
				};
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
		Game.res();
		Game.stats();
	};
	
	Game.saveFile = function(){
		var file = {
			resources: resources,
			stats: stats,
			msg: $("#logs").html()
		};
		localStorage.setItem('saveFile',JSON.stringify(file));
		Game.msg('Game saved');
	};

	Game.loadFile = function(){
		var file = JSON.parse(localStorage.getItem('saveFile'));
		if (file) {
			resources = file.resources;
			stats = file.stats;
			$("#logs").html(file.msg);
		}
	};
	
	Game.getRndInteger = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	};

	Game.res = function() {
		$("#res").html("");
		$.each( resources, function( i, val ) {
			if (val.show==true) {
				$("#res").append(i+': <span id="res_'+i+'">'+val.count+'</span><br/>');
			}
		});
	};
	
	Game.checkhungry = function(what) {
		if (what>10 && what<50) {
			stats.speed.val = 5;
			//set player status
		}
		
		else if (what<10) {
			stats.speed.val = 1;
		}
		else {
			 stats.speed.val = 10;
		}
	}
	
	Game.stats = function() {
		$("#stats").html("");
		Game.checkhungry(stats.calories.val);
		Game.checkhungry(stats.dehydration.val);
		$.each( stats, function( i, val ) {
			$("#stats").append(i+': <span id="stats_'+i+'">'+val.val+'</span><br/>');
		});
	};
	
	Game.msg = function(text) {
		$("#logs").prepend('<p>'+text+'</p>');
		if ($("#logs > p").length>10) $("#logs p").last().remove();
	}
	
	$( "#garbage" ).click(function() {
		$(this).progressTimed(10/stats.speed.val);
		$(this).on('progress-finish', function() {
			var msg = '';
			if (Game.getRndInteger(1,6) < 4) {
				resources.food.count ++;
				msg = "1 food";
			}
			else {
				resources.water.count ++;
				msg = "1 water";
			}
			$(this).off('progress-finish');
			Game.msg('You found '+msg);
		});
	});
	
	Game.init();
	window.setInterval(function(){Game.res(); Game.stats();},100);
	window.setInterval(function(){Game.saveFile()},5000);
});
