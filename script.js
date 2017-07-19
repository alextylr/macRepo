// settings
var roundsToWin = 3;
var countdownFrom = 5;
var newRoundStartsIn = 6000;
var newRoundStartsInFromSnap = 3000;
var pcCallsIn = 2000;
var countdownSpeed = 500;

// timers
var newRoundTimer = undefined;
var pcCalledSnapTimer = undefined;
var countdownTimer = undefined;

// define players
var user = {
	name: 'user',
	roundsWon: 0,
	currentEmoji: undefined
};
var pc = {
	name: 'pc',
	roundsWon: 0,
	currentEmoji: undefined
};

// define our emojis
var emojis = ['💯','💦','🙏🏽','😪','😤','🚮'];
var joker = '💯';

// define state
var currentRound = 0;
var count = countdownFrom;


var start = function () {
	countdown();
};

var countdown = function () {
	if (count != 0) {
		console.clear();
		console.log('count', count);
		}
	if (count <= 0) {
		count = countdownFrom;
		startNextRound();
		return;
	} else {
		countdownTimer = setTimeout(countdown, countdownSpeed);
	}
	count--;
};

var startNextRound = function () {
	currentRound ++;

	console.log('Round', currentRound);
	
	// set players emojis
	pc.currentEmoji = getRandomEmoji();
	user.currentEmoji = getRandomEmoji();

	// pc calls snap
	if (isAMatch()) {
		pcCalledSnapTimer = setTimeout(function () {
			snap(true);
		}, pcCallsIn);
	}
	newRoundTimer = setTimeout(countdown, newRoundStartsIn);
	
	console.log('emojis', pc.currentEmoji, 'vs', user.currentEmoji)
};

var isAMatch = function () {
	if (pc.currentEmoji == joker || user.currentEmoji == joker) {
		return true;
	}
	return pc.currentEmoji == user.currentEmoji;
};

var getRandomEmoji = function () { 
	var randomNumber = Math.round(Math.random() * (emojis.length-1));
	var randomEmoji = emojis[randomNumber];
	return randomEmoji;
};

var snap = function (pcCalledSnap) {
	// compare between the 2 emojis
	// if its a joker then snap is true 
	// if snap is true then the user/pc gets +1 to roundsWon
	// notify of what just happened - console/ui 
	
	///////////////////////////////////////////

	// check for undefined emojis
	if (pc.currentEmoji == undefined || user.currentEmoji == undefined) {
		return false;
	}
	
	clearTimeout(newRoundTimer);
	
	var snap = isAMatch(); 

	console.group('Snap Called by: ' + (pcCalledSnap ? 'PC' : 'User'));


	// pc called
	if (pcCalledSnap) {
		if (snap) {
			pc.roundsWon ++;
			console.log('pc won')
		} else {
			user.roundsWon ++;
			console.log('pc lost')
		}

	// user called
	} else {
		if (snap) {
			user.roundsWon ++; 
			console.log('user won')
			} else {
			pc.roundsWon ++;
			console.log('user lost')
		}
	}


	console.log('User: ', user.roundsWon,'PC: ', pc.roundsWon)

	pc.currentEmoji = undefined;
	user.currentEmoji = undefined;
	
	if (user.roundsWon == roundsToWin) {
		console.log('user won the game')
		console.log('game over')
	} else if (pc.roundsWon == roundsToWin) {
		console.log('pc won the game')
		console.log('game over')
	} else {
		newRoundTimer = setTimeout(countdown, newRoundStartsInFromSnap);
	}

	console.groupEnd();
	};