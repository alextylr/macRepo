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

// define
var currentRound = 0;

var startNextRound = function () {
	// pc and user to be assigned a random emoji each
	// round +1
	currentRound ++;
	pc.currentEmoji = getRandomEmoji();
	user.currentEmoji = getRandomEmoji();

	console.log('emojis', pc.currentEmoji, 'vs', user.currentEmoji)
};
var getRandomEmoji = function () { 
	var randomNumber = Math.round(Math.random() * (emojis.length-1));
	var randomEmoji = emojis[randomNumber];
	return randomEmoji;
}

console.log(emojis)