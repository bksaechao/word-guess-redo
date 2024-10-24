var wgGame = {
    words: ['red', 'blue', 'green', 'yellow']
}

// randomly pick word
var word = wgGame.words[Math.floor(Math.random() * wgGame.words.length)];
console.log(word);
// holds guesses
var corrGuessArr = []

// display word as underscores
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
document.getElementById('test').innerHTML = hiddenWord;


document.onkeyup = (e) => {
    key = e.key 
}