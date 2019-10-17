$(document).ready(function() {
	var Game = {};
	
	var stats = {
					'calories':{'val':0, 'max':100},
					'dehydration':{'val':0, 'max':100},
					'speed':{'val':1, 'max':100}
				};
	var resources = {
						'food':{'val':0, 'show':true},
						'water':{'val':0, 'show':true},
						'medical':{'val':0, 'show':false},
						'weapon':{'val':0, 'show':false},
						'ammo':{'val':0, 'show':false},
						'wood':{'val':0, 'show':false},
						'stone':{'val':0, 'show':false},
						'iron':{'val':0, 'show':false},
						'survivor':{'val':0, 'show':false},
						'gold':{'val':0, 'show':false}
					};

	Game.init = function() {
		Game.loadFile();
		Game.interface();
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
	
	Game.updateResource = function(res, num, id) {
		var cls = '';
		
		if (id=='res') resources[res].val += num;
		else stats[res].val += num;
		
		if (num<0) cls = 'red';
		$("#"+id+"_"+res).html(resources[res].val).next().removeClass("hidde").addClass(cls).html(num);
		window.setInterval(function(){ $("#"+id+"_"+res).next().attr("class", "math hidde").html(""); },1000);
	}; 

	Game.interface = function() {
		$.each( resources, function( i, res ) {
			if (res.show==true) {
				$("#res").append(i+': <span id="res_'+i+'">'+res.val+'</span><span class="math hidde"></span><br/>');
			}
		});
		
		$.each( stats, function( i, res ) {
			$("#stats").append(i+': <span id="stats_'+i+'">'+res.val+'</span><span class="math hidde"></span><br/>');
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
	
	//To Delete
	Game.stats = function() {
		Game.checkhungry(stats.calories.val);
		Game.checkhungry(stats.dehydration.val);
	};
	
	Game.msg = function(text) {
		$("#logs").prepend('<p>'+text+'</p>');
		if ($("#logs > p").length>10) $("#logs p").last().remove();
	}
	
	// To Do
	Game.eat = function(what) {
		
	}
	
	Game.logic = function() {
		if (resources.food.count>0 && stats.calories.val<stats.calories.max) {
			resources.food.add -= 1;
			stats.calories.val += 5;
		}
		if (resources.water.count>0 && stats.dehydration.val<stats.dehydration.max) {
			resources.water.add -= 1;
			stats.dehydration.val += 5;
		}
	}
	
	$( "#garbage" ).click(function() {
		$(this).progressTimed(10/stats.speed.val);
		$(this).on('progress-finish', function() {
			var msg = '';
			if (Game.getRndInteger(1,6) < 4) {
				Game.updateResource('food', 1, 'res');
				msg = "1 food";
			}
			else {
				Game.updateResource('water', 1, 'res');
				msg = "1 water";
			}
			$(this).off('progress-finish');
			Game.msg('You found '+msg);
		});
	});
	
	Game.init();
	window.setInterval(function(){Game.logic()},1000);
	window.setInterval(function(){Game.saveFile()},5000);
});
