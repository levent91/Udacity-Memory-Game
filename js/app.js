//Variables
let cards, moves, hand, points, timer, totalSeconds, hour, minute, second, game;
cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
hand = [];
points = 0;
totalSeconds = 0;
moves = 0;


function shuffle(array) { //Shuffles the deck.
	game = true;
	$(".summary").hide();
	let currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
shuffle(cards);
distribute();

function distribute() { //Distributes shuffled cards on table.
	$("li.card").children().each(function(index) {
		$(this).removeClass();
	});
	for (var i = 0; i < 16; i++) {
		$("#deck-" + i).addClass(cards[i]);
	}
}

function count() { //Timer
	++totalSeconds;
	hour = Math.floor(totalSeconds / 3600);
	minute = Math.floor((totalSeconds - hour * 3600) / 60);
	second = totalSeconds - (hour * 3600 + minute * 60);
	document.getElementById("clock").innerHTML = minute + ":" + second;
}
function startTimer(){ //Starts the timer
if (!timer){
timer = setInterval(count, 1000);
}
}

function reset() { //Resets the timer
	clearInterval(timer);
	totalSeconds = 0;
	startTimer();
    timer = true;
}
init();

function play() { //Function to click and check cards
	if (game) {
		$(".card").on("click", function() {
			if (hand.length === 0) {
				starRating();
                startTimer();
				a = $(this).addClass("open show");
				hand.push($(this).children("i").attr("class").split(' ')[1]); //Used split for lines 77-78-82-83-88-89
				addMove();
				$(".moves").text(moves);
			} else if (hand.length === 1) {
				starRating();
				$(this).addClass("open show");
				hand.push($(this).children("i").attr("class").split(' ')[1]);
				setTimeout(function() //Timeout function to let player see the second card for a while even if its gonna get hidden in next step
					{
						check();;
					}, 800);
			}
		});
	};
};

function check() { //Check if cards match.
	if (points === 14) {
		match($('.card:has(.' + hand[0] + ')'));
		match($('.card:has(.' + hand[1] + ')'));
		hand.pop();
		hand.pop();
		stopGame();
	} else if (hand[0] === hand[1]) {
		match($('.card:has(.' + hand[0] + ')'));
		match($('.card:has(.' + hand[1] + ')'));
		hand.pop();
		hand.pop();
		points += 2;
	} else {
        hide($('.card:has(.' + hand[0] + ')'));
		hide($('.card:has(.' + hand[1] + ')'));
		hand.pop();
		hand.pop();
	}
};

function hide(card) { //If cards do not match, they stay closed.
	card.removeClass('open show');
}

function match(card) { //If cards match, they stay open.
	card.addClass('match');
	card.removeClass('open show');
}

function init() { //Starts the game
	if (game === true) {
		play();
	} else stopGame();
}

function addMove() { //Adds moves
	moves += 1;
	$('.moves').text(moves);
}

function stopGame() { //Stops the game
	game = false;
	clearInterval(timer);
	win();
}
$(".restart").on("click", function() { //Restart function on click
	restart();
});

function win() { //Win panel
	$(".deck").hide();
	$(".summary h3").append("Your finishing time is " + minute + " minute " + second + " seconds.")
	$(".summary").show();
	$(".restart-button").on("click", function() {
		restart();
	});
}

function restart() { //Restart function
	$(".summary h3").empty();
	$(".deck").show();
	$("li").removeClass("match");
	$("li").removeClass("open show");
	$("#ff").show();
	$("#aa").show();
	$("#cc").show();
	reset();
	moves *= 0;
	$(".stars").css("color", "black");
	$(".moves").text(moves);
	game = true;
    timer = false;
    document.getElementById("clock").innerHTML = 0 + ":" + 0; //Cleans the timer visually.
	shuffle(cards);
	distribute();
	points *= 0;
}

function starRating() { //Shows and removes stars from panel
	if (moves < 16) {
		$("#ff").show();
		$("#aa").show();
		$("#cc").show();
	} else if (moves > 30) {
		$("#ff").hide();
		$("#aa").hide();
		$("#cc").show();
	} else {
		$("#ff").hide();
		$("#aa").show();
		$("#cc").show();
	}
};