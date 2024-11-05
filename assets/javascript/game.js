const wgGame = {
  words: [
    "red",
    "blue",
    "green",
    "yellow",
    "fabulous",
    "bleach",
    "ludwig",
    "tiger",
    "youtube",
    "asmongold",
    "demon",
    "buddah",
    "kurosaki ichigo",
    "dinosaur",
    "genshin impact",
    "sushi",
    "javascript",
    "zebra",
    "dragon age",
    "monster hunter",
    "fortnite",
    "lucky daye",
    "money",
  ],
  alphabet: "abcdefghijklmnopqrstuvwxyz",
  secretWord: null,
  wins: 0,
  lose: 0,
  guessesLeft: 0,
  userGuess: [],
  correctGuess: [],

  // Set-up game and builds world view
  gameStart: function () {
    this.pickSecretWord();
    this.rebuildWord();
    this.updateTotalGuess();
  },

  resetGame: function () {
    this.userGuess = [];
    this.correctGuess = [];
    this.resetGuessedLetters();
    this.gameStart();
  },

  // Randomly picks word from words array
  pickSecretWord: function () {
    // Picks a word from words array at random
    let word = wgGame.words[Math.floor(Math.random() * wgGame.words.length)];
    // Sets secretWord to randomly picked word
    this.secretWord = word;
    console.log(word);
  },

  // Sets & displays total guesses
  updateTotalGuess: function () {
    this.guessesLeft = this.secretWord.length + 3;
    document.getElementById("guesses-left").innerText =
      "Guesses left: " + this.guessesLeft;
  },

  // Checks for a match between user input at secretWord array
  updateGuess: function () {
    // if letter is correct..
    this.handleCorrectLetter();
    // if letter is incorrect..
    this.handleWrongLetter();
    // updates page with re-built word
    this.rebuildWord();
    this.displayWrongLetter();
    // checks for win
    this.gameWin();
    // checks for loss
    this.gameLose();
  },

  // pushes matching letter to correct guess array if it hasn't been picked already & updates guesses
  handleCorrectLetter: function () {
    if (
      wgGame.correctGuess.indexOf(key) === -1 &&
      wgGame.secretWord.indexOf(key) > -1
    ) {
      wgGame.correctGuess.push(key);
      console.log("Correct Guesses: " + this.correctGuess);
      this.guessesLeft--;
      document.getElementById("guesses-left").innerText =
        "Guesses Left: " + this.guessesLeft;
    } else if (wgGame.correctGuess.indexOf(key) > -1) {
      this.repeatedLetter();
    }
  },

  // pushes non-matching letter to guessed letter
  handleWrongLetter: function () {
    if (
      this.userGuess.indexOf(key) === -1 &&
      this.secretWord.indexOf(key) === -1
    ) {
      wgGame.userGuess.push(key);
      console.log("Incorrect Guesses: " + this.userGuess);
      this.guessesLeft--;
      this.gameLose();
      document.getElementById("guesses-left").innerText =
        "Guesses Left: " + this.guessesLeft;
    } else if (wgGame.userGuess.indexOf(key) > -1) {
      this.repeatedLetter();
    }
  },

  // Display incorrect guesses to page
  displayWrongLetter: function () {
    let wrongLetters = this.userGuess
      .map((letter) => {
        return letter;
      })
      .join(" ");

    document.getElementById("wrong-letter").innerText = wrongLetters;
  },

  // Check if " _ " still exist within secret word, otherwise reset word and update wins
  gameWin: function () {
    if (document.getElementById("test").innerText.includes("_")) {
      this.rebuildWord();
    } else {
      this.resetGame();
      this.wins++;
      document.getElementById("wins").innerText = "Wins: " + this.wins;
    }
  },

  // Function runs when guesses run out
  gameLose: function () {
    if (this.guessesLeft === 0) {
      this.resetGame();
      this.lose++;
      document.getElementById("lose").innerText = "Lose: " + this.lose;
    }
  },

  // Displays correctly guessed letters onto page
  rebuildWord: function () {
    let rebuiltWord = this.secretWord
      .split("")
      .map(function (key) {
        if (key === " ") {
          return "\xa0";
        } else if (wgGame.correctGuess.indexOf(key) > -1) {
          return key;
        } else {
          return " _ ";
        }
      })
      .join("");
    document.getElementById("test").innerHTML = rebuiltWord;
  },

  // Resets title text
  resetText: function () {
    document.getElementById("banner").innerText = "Guess the Word!";
  },

  // Reset guessed letters on page
  resetGuessedLetters: function () {
    document.getElementById("wrong-letter").innerText = "";
  },

  // Tells user if a letter has already been guessed
  repeatedLetter: function () {
    document.getElementById("banner").innerText = "You already guessed that!";
    setTimeout(wgGame.resetText, 500);
  },
};

wgGame.gameStart();

document.onkeyup = (e) => {
  // capture user input
  key = e.key.toLowerCase();
  // checks if user input is a letter
  if (wgGame.alphabet.includes(key)) {
    // handles game logic when letter is clicked
    wgGame.updateGuess();
  } else {
    // if user input is not a letter...
    document.getElementById("banner").innerText = "Invalid Input!";
    setTimeout(wgGame.resetText, 500);
  }
};
