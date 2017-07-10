var currentWord = "paragliding";
document.addEventListener("DOMContentLoaded", function(event) { 
	var guessElement = document.querySelector(".my-guess");
	var attemptsRemainingElement = document.querySelector(".attempts-remaining");
	var wrongGuessesElement = document.querySelector(".wrong-guesses");
	var gameStatusMessageElement = document.querySelector(".game-status-message");
	var repeatedIncorrectGuessElement = document.querySelector(".repeated-incorrect-guess");
	var freshGameSameWordButton = document.querySelector(".fresh-game-same-word");
	var freshGameNewWordButton = document.querySelector(".fresh-game-new-word");
  	startNewGame(currentWord);
	document.addEventListener('keydown', function(e) {
		debugger;
		var alnumRegex = /^[0-9a-z]+$/;
	    if(e.key.match(alnumRegex) && canPlay) {
	    	var guessedLetter = e.key;
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

    function startNewGame(currentWord) {
		arrayDisplayedGuess = new Array(currentWord.length);
		arrayDisplayedGuess.fill("_");
		arrayWrongGuessedLetters = [];
		numGuesses = 0;
		incorrectGuesses = 0;
		attemptsRemaining = 12;
		canPlay = true;
		// document.addEventListener("DOMContentLoaded", function(event) {
	  	updateDisplayedGuesses();
	  	updateAttemptsRemaining();
	  	updateFailedGuesses();
	  	hideElement(repeatedIncorrectGuessElement);
	  	clearGameStatusText();
		// }
	}
	function updateDisplayedGuesses() {
		guessElement.innerText = arrayDisplayedGuess.join("");
	}
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
		currentWord = "rodeo";
	}
	function startFreshGameSameWord() {
		startNewGame(currentWord);
	}
	function startFreshGameNewWord() {
		generateNewCurrentWord();
		startNewGame(currentWord);
	}
});
