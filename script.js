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

var startNextRound = function () {
	currentRound ++;

	console.log('Round', currentRound);
	
	// set players emojis
	pc.currentEmoji = getRandomEmoji();
	user.currentEmoji = getRandomEmoji();

	console.log('emojis', pc.currentEmoji, 'vs', user.currentEmoji)
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
	//

	// check for undefined emojis
	if (pc.currentEmoji == undefined || user.currentEmoji == undefined) {
		return false;
	}

	var snap = pc.currentEmoji == user.currentEmoji; 

	if (pc.currentEmoji == joker || user.currentEmoji == joker) {
		snap = true;
	}

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
			user.roundsWon 
			console.log('user won')
			} else {
			pc.roundsWon ++;
			console.log('user lost')
		}
	}


	console.log('User: ', user.roundsWon,'PC: ', pc.roundsWon)

	pc.currentEmoji = undefined;
	user.currentEmoji = undefined;
	
	if (user.roundsWon == 3) {
		console.log('user won the game')
		console.log('game over')
	} else if (pc.roundsWon == 4) {
		console.log('pc won the game')
		console.log('game over')
	}

	console.groupEnd();
	

	};