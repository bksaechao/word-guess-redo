var wgGame = {
    words: ['red', 'blue', 'green', 'yellow'],

    corrGuessArr: [],
    // Randomly picks word from words array and displays letters as underscores on html.
    secretWord: function () {
        var word = wgGame.words[Math.floor(Math.random() * wgGame.words.length)];
        console.log(word);

        var hiddenWord = word.split('').map(
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
    }
}

wgGame.secretWord();

document.onkeyup = (e) => {
    key = e.key 
}