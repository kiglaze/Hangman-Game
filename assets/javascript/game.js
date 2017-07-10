var possibleWhatIsThisItems = [
	{name: "paragliding", imageFileName: "paragliding.jpg"},
	{name: "kite", imageFileName: "kite.jpg"},
	{name: "submarine", imageFileName: "submarine.png"},
	{name: "glacier", imageFileName: "glacier.jpg"},
	{name: "snorkeling", imageFileName: "snorkeling.jpg"},
	{name: "kiteboarding", imageFileName: "kiteboarding.jpg"},
	{name: "bouldering", imageFileName: "bouldering.jpg"},
	{name: "seal", imageFileName: "seal.jpg"},
	{name: "kiwi", imageFileName: "kiwibird.jpg"},
	{name: "panini", imageFileName: "panini.jpg"}
];
currentItem = pickRandomWhatIsThisItem(possibleWhatIsThisItems);
var currentWord = currentItem.name;
document.addEventListener("DOMContentLoaded", function(event) { 
	var guessElement = document.querySelector(".my-guess");
	var attemptsRemainingElement = document.querySelector(".attempts-remaining");
	var wrongGuessesElement = document.querySelector(".wrong-guesses");
	var gameStatusMessageElement = document.querySelector(".game-status-message");
	var repeatedIncorrectGuessElement = document.querySelector(".repeated-incorrect-guess");
	var freshGameSameWordButton = document.querySelector(".fresh-game-same-word");
	var freshGameNewWordButton = document.querySelector(".fresh-game-new-word");
	var guessItemImage = document.querySelector(".guess-this-image");
	var winsCountElement = document.querySelector(".wins-count");
	var winsCount = 0;
	setImage(currentItem.imageFileName);
  	startNewGame(currentWord);
	document.addEventListener('keydown', function(e) {
		var alphaRegex = /^[A-Za-z]+$/;
	    if(e.key.match(alphaRegex) && e.keyCode !== 16 && canPlay) {
	    	var guessedLetter = e.key.toLowerCase();
	    	if(currentWord.includes(guessedLetter)) {
	    		hideElement(repeatedIncorrectGuessElement);
	    		var isBlanksLeft = false;
	    		for (var i = 0; i < currentWord.length; i++) {
	    			if(currentWord[i] === guessedLetter) {
	    				arrayDisplayedGuess[i] = guessedLetter;
	    				updateDisplayedGuesses();
	    			}
	    			if(isBlanksLeft === false && arrayDisplayedGuess[i] === "_") {
	    				isBlanksLeft = true;
	    			}
	    		}
	    		if(isBlanksLeft === false && attemptsRemaining > 0) {
	    			doWonGameActions();
	    		}
	    	} else {
	    		if(!arrayWrongGuessedLetters.includes(guessedLetter)) {
	    			hideElement(repeatedIncorrectGuessElement);
					incorrectGuesses++;
					attemptsRemaining--;
					updateAttemptsRemaining();
					arrayWrongGuessedLetters.push(guessedLetter);
					updateFailedGuesses();
					if(attemptsRemaining <= 0) {
						doLostGameActions();
					}
	    		} else {
	    			showElement(repeatedIncorrectGuessElement);
	    		}
	    	}
	    	numGuesses++;
	    }
	}); 
    freshGameSameWordButton.addEventListener('click', function(e) {
    	startFreshGameSameWord();
    });
    freshGameNewWordButton.addEventListener('click', function(e) {
    	startFreshGameNewWord();
    });
    /*
    * Starts a new game with a given word.
    */
    function startNewGame(currentWord) {
		arrayDisplayedGuess = new Array(currentWord.length);
		arrayDisplayedGuess.fill("_");
		arrayWrongGuessedLetters = [];
		numGuesses = 0;
		incorrectGuesses = 0;
		attemptsRemaining = 12;
		canPlay = true;
	  	updateDisplayedGuesses();
	  	updateAttemptsRemaining();
	  	updateFailedGuesses();
	  	hideElement(repeatedIncorrectGuessElement);
	  	clearGameStatusText();
	  	setImage(currentItem.imageFileName);
	}
	/*
	* Updates the place where the guessed letters go. Letters that have not yet been correctly guesses are represented by an "_".
	*/
	function updateDisplayedGuesses() {
		guessElement.innerText = arrayDisplayedGuess.join("");
	}
	/*
	* Updates the text saying the number of attempts remaining for the current word.
	*/
	function updateAttemptsRemaining() {
		attemptsRemainingElement.innerText = attemptsRemaining;
	}
	function updateFailedGuesses() {
		wrongGuessesElement.innerText = arrayWrongGuessedLetters.join(", ");
	}
	function doLostGameActions() {
		gameStatusMessageElement.innerText = "Sorry, you lost.";
		canPlay = false;
	}
	function doWonGameActions() {
		gameStatusMessageElement.innerText = "Congratulations!!! You won.";
		winsCount++;
		winsCountElement.innerText = winsCount;
		canPlay = false;
	}
	function clearGameStatusText() {
		gameStatusMessageElement.innerText = "";
	}
	function hideElement(element) {
		element.style.display = "none";
	}
	function showElement(element) {
		element.style.display = "block";
	}
	function generateNewCurrentWord() {
		currentItem = pickRandomWhatIsThisItem(possibleWhatIsThisItems);
		if(currentItem.name === currentWord) {
			generateNewCurrentWord();
		}
		currentWord = currentItem.name;
	}
	function startFreshGameSameWord() {
		startNewGame(currentWord);
	}
	function startFreshGameNewWord() {
		generateNewCurrentWord();
		startNewGame(currentWord);
	}
	function setImage(imageFileName) {
		guessItemImage.setAttribute("src", "assets/images/" + imageFileName);
	}
});
function pickRandomWhatIsThisItem(possibleWhatIsThisItems) {
	return possibleWhatIsThisItems[getRandomInt(0, possibleWhatIsThisItems.length - 1)];
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
