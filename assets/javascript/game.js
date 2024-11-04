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

  // Handles all logic when user guesses a letter
  handleGuess: function () {
    if (this.guessesLeft === 0) {
      this.resetGame();
    } else {
      this.updateGuess();
      this.rebuildWord();
      this.gameWin();
    }
  },

  // Checks for a match between user input at secretWord array
  updateGuess: function () {
    let value = this.secretWord.indexOf(key);
    // if letter matches...
    if (value > -1) {
      this.handleCorrectLetter();
      // if letter doesn't match...
    } else {
      this.handleWrongLetter();
    }
  },

  handleCorrectLetter: function () {
    if (
      wgGame.secretWord.indexOf(key) > -1 &&
      wgGame.correctGuess.includes(key)
    ) {
      this.repeatLetter();
    } else {
      wgGame.correctGuess.push(key);
      console.log("Correct Guesses: " + this.correctGuess);
      this.guessesLeft--;
      document.getElementById("guesses-left").innerText =
        "Guesses Left: " + this.guessesLeft;
    }
  },

  handleWrongLetter: function () {
    if (
      wgGame.secretWord.indexOf(key) === -1 &&
      wgGame.userGuess.includes(key)
    ) {
      this.repeatLetter();
    } else {
      wgGame.userGuess.push(key);
      console.log("Incorrect Guesses: " + this.userGuess);
      this.guessesLeft--;
      document.getElementById("guesses-left").innerText =
        "Guesses Left: " + this.guessesLeft;
    }
  },

  // Check for win
  gameWin: function () {
    if (document.getElementById("test").innerText.includes("_")) {
      this.rebuildWord();
    } else {
      this.resetGame();
      this.wins++;
      document.getElementById("wins").innerText = "Wins: " + this.wins;
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

  // Tells user if a letter has already been guessed
  repeatLetter: function () {
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
    wgGame.handleGuess();
  } else {
    // if user input is not a letter...
    document.getElementById("banner").innerText = "Invalid Input!";
    setTimeout(wgGame.resetText, 500);
  }
};
