const wgGame = {
  words: [
    {
      artist: "rini",
      image: "assets/images/rini.jpeg",
      song: "assets/audio/rini.mp3",
    },
    {
      artist: "bruno mars",
      image: "assets/images/bruno-mars.jpeg",
      song: "assets/audio/bruno-mars.mp3",
    },
    {
      artist: "blxst",
      image: "assets/images/blxst.jpeg",
      song: "assets/audio/blxst.mp3",
    },
    {
      artist: "shallou",
      image: "assets/images/shallou.jpeg",
      song: "assets/audio/shallou.mp3",
    },
    {
      artist: "saosin",
      image: "assets/images/saosin.jpeg",
      song: "assets/audio/saosin.mp3",
    },
    {
      artist: "a day to remember",
      image: "assets/images/adtr.jpeg",
      song: "assets/audio/adtr.mp3",
    },
    {
      artist: "zedd",
      image: "assets/images/zedd.jpeg",
      song: "assets/audio/zedd.mp3",
    },
    {
      artist: "san holo",
      image: "assets/images/san-holo.jpeg",
      song: "assets/audio/san-holo.mp3",
    },
    {
      artist: "gabe bondoc",
      image: "assets/images/gabe-bondoc.jpeg",
      song: "assets/audio/gabe-bondoc.mp3",
    },
    {
      artist: "giveon",
      image: "assets/images/giveon.jpeg",
      song: "assets/audio/giveon.mp3",
    },
    {
      artist: "matisse and sadko",
      image: "assets/images/matisse-sadko.jpeg",
      song: "assets/audio/matisse-sadko.mp3",
    },
    {
      artist: "utada hikaru",
      image: "assets/images/utada-hikaru.jpeg",
      song: "assets/audio/utada-hikaru.mp3",
    },
    {
      artist: "june",
      image: "assets/images/june.jpeg",
      song: "assets/audio/june.mp3",
    },
    {
      artist: "junny",
      image: "assets/images/junny.jpeg",
      song: "assets/audio/junny.mp3",
    },
    {
      artist: "seven lions",
      image: "assets/images/seven-lions.jpeg",
      song: "assets/audio/seven-lions.mp3",
    },
    {
      artist: "madeon",
      image: "assets/images/madeon.jpeg",
      song: "assets/audio/madeon.mp3",
    },
    {
      artist: "desmond dennis",
      image: "assets/images/desmond-dennis.jpeg",
      song: "assets/audio/desmond-dennis.mp3",
    },
    {
      artist: "lione",
      image: "assets/images/lione.jpeg",
      song: "assets/audio/lione.mp3",
    },
    {
      artist: "justin bieber",
      image: "assets/images/justin-bieber.jpeg",
      song: "assets/audio/justin-bieber.mp3",
    },
    {
      artist: "lucky daye",
      image: "assets/images/lucky-daye.jpeg",
      song: "assets/audio/lucky-daye.mp3",
    },
    {
      artist: "dvwn",
      image: "assets/images/dvwn.jpeg",
      song: "assets/audio/dvwn.mp3",
    },
  ],
  alphabet: "abcdefghijklmnopqrstuvwxyz",
  secretWord: null,
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
    this.displayScore();
    this.displayHiddenArtist();
  },

  // Resets array items, removes guessed letters from page, and picks new word
  resetGame: function () {
    this.userGuess = [];
    this.correctGuess = [];
    this.resetGuessedLetters();
    this.pickSecretWord();
    this.rebuildWord();
    this.updateTotalGuess();
    this.displayScore();
  },

  resetScore: function () {
    this.wins = 0;
    this.lose = 0;
    this.stopSong();
    this.resetText();
    this.resetImage();
    this.resetGame();
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

  // Displays win/loss scores
  displayScore: function () {
    document.getElementById("wins").innerText = "Wins: " + this.wins;
    document.getElementById("lose").innerText = "Lose: " + this.lose;
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

  // pushes matching letter to correct guess array if not already picked already & updates guesses
  handleCorrectLetter: function () {
    if (
      wgGame.correctGuess.indexOf(key) === -1 &&
      wgGame.secretWord.artist.indexOf(key) > -1
    ) {
      wgGame.correctGuess.push(key);
      this.guessesLeft--;
      document.getElementById("guesses-left").innerText =
        "Guesses Left: " + this.guessesLeft;
    } else if (wgGame.correctGuess.indexOf(key) > -1) {
      this.repeatedLetter();
    }
  },

  // pushes non-matching letter to guessed letter array if not already picked & updates guesses
  handleWrongLetter: function () {
    if (
      this.userGuess.indexOf(key) === -1 &&
      this.secretWord.artist.indexOf(key) === -1
    ) {
      wgGame.userGuess.push(key);
      this.displayWrongLetter();
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

  // Displays aritist to page
  displayArtist: function () {
    let image = document.getElementById("artist-image");
    image.src = this.secretWord.image;
    image.style.visibility = "initial";
  },

  displayHiddenArtist: function () {
    let image = document.getElementById("artist-image");
    image.src = this.secretWord.image;
    image.style.visibility = "hidden";
  },

  // Removes image from page
  resetImage: function () {
    let image = document.getElementById("artist-image");
    image.style.visibility = "hidden";
  },

  // Changes heading title to artist name
  displayName: function () {
    document.getElementById("banner").innerText =
      this.secretWord.artist.toUpperCase();
  },

  // Check if " _ " still exist within secret word, otherwise reset word and update wins
  gameWin: function () {
    if (document.getElementById("test").innerText.includes("_")) {
      this.rebuildWord();
    } else {
      this.playSong();
      this.displayArtist();
      this.displayName();
      this.wins++;
      document.getElementById("wins").innerText = "Wins: " + this.wins;
      this.resetGame();
    }
  },

  // Function runs when guesses run out
  gameLose: function () {
    if (this.guessesLeft === 0) {
      this.stopSong();
      this.resetImage();
      this.resetText();
      this.lose++;
      document.getElementById("lose").innerText = "Lose: " + this.lose;
      this.resetGame();
    }
  },

  // Sets source of audio tag and plays song.
  playSong: function () {
    let song = document.getElementById("audioSrc");
    song.src = this.secretWord.song;
    song.play();
  },

  // Sets source of audio tag and stops song.
  stopSong: function () {
    let song = document.getElementById("audioSrc");
    song.src = this.secretWord.song;
    song.pause();
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

  // Resets title text
  resetText: function () {
    document.getElementById("banner").innerText = "Guess the Word!";
  },

  // Reset guessed letters on page
  resetGuessedLetters: function () {
    document.getElementById("wrong-letter").innerText = "";
  },

  resetGuessedLetters: function () {
    setTimeout(function () {
      wgGame.displayWrongLetter();
    }, 500);
  },

  // Tells user if a letter has already been guessed
  repeatedLetter: function () {
    document.getElementById("wrong-letter").innerText =
      "You already guessed that!";
    this.resetGuessedLetters();
  },
};

// starts the game when page is loaded
wgGame.gameStart();

// when user removes finger from key...
document.onkeyup = (e) => {
  // capture user input
  key = e.key.toLowerCase();
  // checks if user input is a letter
  if (wgGame.alphabet.includes(key)) {
    // handles game logic when letter is clicked
    wgGame.updateGuess();
  } else {
    // if user input is not a letter...
    document.getElementById("wrong-letter").innerText = "Invalid Input!";
    wgGame.resetGuessedLetters();
  }
};

document.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.innerText === "Reset") {
    wgGame.resetScore();
  } else {
  }
});
