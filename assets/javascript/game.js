const wgGame = {
  words: [
    {
      artist: "rini",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/rini.mp3",
    },
    {
      artist: "bruno mars",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/bruno-mars.mp3",
    },
    {
      artist: "blxst",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/blxst.mp3",
    },
    {
      artist: "shallou",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/shallou.mp3",
    },
    {
      artist: "saosin",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/saosin.mp3",
    },
    {
      artist: "a day to remember",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/adtr.mp3",
    },
    {
      artist: "zedd",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/zedd.mp3",
    },
    {
      artist: "san holo",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/san-holo.mp3",
    },
    {
      artist: "gabe bondoc",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/gabe-bondoc.mp3",
    },
    {
      artist: "giveon",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/giveon.mp3",
    },
    {
      artist: "matisse and sadko",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/matisse-sadko.mp3",
    },
    {
      artist: "utada hikaru",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/utada-hikaru.mp3",
    },
    {
      artist: "june",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/june.mp3",
    },
    {
      artist: "junny",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/junny.mp3",
    },
    {
      artist: "seven lions",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/seven-lions.mp3",
    },
    {
      artist: "madeon",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/madeon.mp3",
    },
    {
      artist: "desmond dennis",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/desmond-dennis.mp3",
    },
    {
      artist: "lione",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/lione.mp3",
    },
    {
      artist: "justin bieber",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/justin-bieber.mp3",
    },
    {
      artist: "lucky daye",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/lucky-daye.mp3",
    },
    {
      artist: "dvwn",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/dvwn.mp3",
    },
  ],
  alphabet: "abcdefghijklmnopqrstuvwxyz",
  secretWord: null,
  audio: null,
  isPlaying: null,
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
    this.audio = new Audio(this.secretWord.song);
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
    let word = this.words[Math.floor(Math.random() * this.words.length)];
    // Sets secretWord to randomly picked word
    this.secretWord = word;
    console.log(word);
  },

  // Sets & displays total guesses
  updateTotalGuess: function () {
    this.guessesLeft = this.secretWord.artist.length + 3;
    document.getElementById("guesses-left").innerText =
      "Guesses left: " + this.guessesLeft;
  },

  // Checks for a match between user input at secretWord array
  updateGuess: function () {
    // if letter is correct..
    this.handleCorrectLetter();
    // if letter is incorrect..
    this.handleWrongLetter();
    // re-displays word to page
    this.rebuildWord();
    // check for win..
    this.gameWin();
    // check for loss..
    this.gameLose();
  },

  // pushes matching letter to correct guess array if it hasn't been picked already & updates guesses
  handleCorrectLetter: function () {
    if (
      wgGame.correctGuess.indexOf(key) === -1 &&
      wgGame.secretWord.artist.indexOf(key) > -1
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

  // pushes non-matching letter to guessed letter array
  handleWrongLetter: function () {
    if (
      this.userGuess.indexOf(key) === -1 &&
      this.secretWord.artist.indexOf(key) === -1
    ) {
      wgGame.userGuess.push(key);
      this.displayWrongLetter();
      console.log("Incorrect Guesses: " + this.userGuess);
      this.guessesLeft--;
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

  displayArtist: function () {
    let image = document.getElementById("artist-image");
    image.src = this.secretWord.image;
    image.style.display = "initial";
  },

  displayName: function () {
    document.getElementById("banner").innerText = this.secretWord.artist;
  },

  // Check if " _ " still exist within secret word, otherwise reset word and update wins
  gameWin: function () {
    if (document.getElementById("test").innerText.includes("_")) {
      this.rebuildWord();
    } else {
      console.log(this.audio.play());
      this.audio.play();
      this.displayArtist();
      this.displayName();
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

  checkAudio: function () {
    if (this.guessesLeft === 0) {
      this.audio.pause();
    }
  },

  // Displays correctly guessed letters onto page
  rebuildWord: function () {
    let rebuiltWord = this.secretWord.artist
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

  getSong: function () {
    this.audio = new Audio(this.secretWord.song);
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

// starts the game when page is loaded
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
