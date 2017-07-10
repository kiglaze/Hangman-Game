var currentWord = "paragliding";
var arrayDisplayedGuess = new Array(currentWord.length);
arrayDisplayedGuess.fill("_");
var arrayWrongGuessedLetters = [];
var numGuesses = 0;
var incorrectGuesses = 0;
document.addEventListener("DOMContentLoaded", function(event) { 
	var guessElement = document.querySelector(".my-guess");
  	updateDisplayedGuesses();
	document.addEventListener('keydown', function(e) {
		debugger;
		var alnumRegex = /^[0-9a-z]+$/;
	    if(e.key.match(alnumRegex)) {
	    	var guessedLetter = e.key;
	    	if(currentWord.includes(guessedLetter)) {
	    		for (var i = 0; i < currentWord.length; i++) {
	    			if(currentWord[i] === guessedLetter) {
	    				arrayDisplayedGuess[i] = guessedLetter;
	    				updateDisplayedGuesses();
	    			}
	    		}

	    	} else {
				arrayWrongGuessedLetters.push(guessedLetter);
				incorrectGuesses++;
	    	}
	    	numGuesses++;
	    }
	}); 
	function updateDisplayedGuesses() {
		guessElement.innerText = arrayDisplayedGuess.join("");
	}
});
