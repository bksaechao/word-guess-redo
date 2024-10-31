const wgGame = {
    words: ['red', 'blue', 'green', 'yellow', 'fabulous', 'bleach', 'ludwig', 'tiger', 'youtube', 'burger king'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz',
    secretWord: null,
    guessesLeft: null,
    userGuess: [],
    correctGuess: [],
    // Set-up game and builds world view.
    gameStart: function () {
        this.pickSecretWord();
        this.displaySecretWord();
    },
    //Randomly picks word from words array
    pickSecretWord: function () {
                // Picks a word from words array at random
                let word = wgGame.words[Math.floor(Math.random() * wgGame.words.length)];
                // Sets secretWord to randomly picked word
                this.secretWord = word
                console.log(word);
                // Sets guesses left
                this.guessesLeft = word.length + 5
    },
    // Displays world onto DOM as hidden letters
    displaySecretWord: function () {
        var hiddenWord = this.secretWord.split('').map(
            function (letter) {
                if (letter === " ") {
                    return "\xa0"
                } else {
                    return " _ "
                }
            }
        ).join("");
        console.log(hiddenWord);
        document.getElementById('test').innerHTML = hiddenWord
    },

    // Checks for a match between user input at secretWord array
    updateGuess: function() {
        let value = this.secretWord.indexOf(key);
        // if letter matches...
        if (value > -1) {
            this.correctGuess.push(key)
            this.guessesLeft--;
            console.log("Correct Guesses: " + this.correctGuess);
        // if letter doesn't match...
        } else  {
            this.userGuess.push(key);
            this.guessesLeft--;
            console.log("Incorrect Guesses: " + this.userGuess);
        }
    },

    correctKey: function() {
        
    },

    rebuildWord: function() {
        let rebuiltWord = this.secretWord.split('').map(
            function(key) {
                if (key === " ") {
                    return "\xa0"
                } else if (wgGame.correctGuess.indexOf(key) > -1) {
                    return key
                } else {
                    return " _ "
                }
            }
        ).join("");
        document.getElementById('test').innerHTML = rebuiltWord;
    },

    wrongInput: function() {
        document.getElementById("banner").innerText = "Guess the Word!"
    }
}

wgGame.gameStart();

document.onkeyup = (e) => {
    // capture user input
    key = e.key.toLowerCase();
    console.log(key);
    // checks if user input is a letter
    if (wgGame.alphabet.includes(key)) {
        wgGame.updateGuess();
        wgGame.rebuildWord(key);
    } else {
        document.getElementById("banner").innerText = "Invalid Input!"
        setTimeout(wgGame.wrongInput, 500);
    }
}