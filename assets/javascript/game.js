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
    "burger king",
  ],
  alphabet: "abcdefghijklmnopqrstuvwxyz",
  secretWord: null,
  guessesLeft: null,
  userGuess: [],
  correctGuess: [],

  // Set-up game and builds world view
  gameStart: function () {
    this.pickSecretWord();
    this.displaySecretWord();
    document.getElementById("guesses-left").innerText =
      "Guesses left: " + this.guessesLeft;
  },

  //Randomly picks word from words array
  pickSecretWord: function () {
    // Picks a word from words array at random
    let word = wgGame.words[Math.floor(Math.random() * wgGame.words.length)];
    // Sets secretWord to randomly picked word
    this.secretWord = word;
    console.log(word);
    // Sets guesses left
    this.guessesLeft = word.length + 3;
  },

  // Displays world onto DOM as hidden letters
  displaySecretWord: function () {
    var hiddenWord = this.secretWord
      .split("")
      .map(function (letter) {
        if (letter === " ") {
          return "\xa0";
        } else {
          return " _ ";
        }
      })
      .join("");
    console.log(hiddenWord);
    document.getElementById("test").innerHTML = hiddenWord;
  },

  // Checks for a match between user input at secretWord array
  updateGuess: function () {
    let value = this.secretWord.indexOf(key);
    // if letter matches...
    if (value > -1) {
      this.checkCorrectLetter();
      this.gameWin();
      document.getElementById("guesses-left").innerText =
        "Guesses Left: " + this.guessesLeft;
      // if letter doesn't match...
    } else {
      this.checkWrongLetter();
      this.gameLose();
      document.getElementById("guesses-left").innerText =
        "Guesses Left: " + this.guessesLeft;
    }
  },

  checkCorrectLetter: function () {
    if (
      wgGame.secretWord.indexOf(key) > -1 &&
      wgGame.correctGuess.includes(key)
    ) {
      document.getElementById("banner").innerText = "You already guessed that!";
      setTimeout(wgGame.resetText, 500);
    } else {
      wgGame.correctGuess.push(key);
      console.log("Correct Guesses: " + this.correctGuess);
      this.guessesLeft--;
    }
  },

  checkWrongLetter: function () {
    if (
      wgGame.secretWord.indexOf(key) === -1 &&
      wgGame.userGuess.includes(key)
    ) {
      document.getElementById("banner").innerText = "You already guessed that!";
      setTimeout(wgGame.resetText, 500);
    } else {
      wgGame.userGuess.push(key);
      console.log("Incorrect Guesses: " + this.userGuess);
      this.guessesLeft--;
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

  // Check for win
  gameWin: function () {
    if (document.getElementById("test").innerText.includes("_")) {
      console.log("yes!");
    } else {
      this.gameStart();
    }
  },

  // Check for loss
  gameLose: function () {
    if (this.guessesLeft === 0) {
      this.gameStart();
    }
  },

  // Resets title text
  resetText: function () {
    document.getElementById("banner").innerText = "Guess the Word!";
  },
};

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
    document.getElementById("banner").innerText = "Invalid Input!";
    setTimeout(wgGame.resetText, 500);
  }
};
