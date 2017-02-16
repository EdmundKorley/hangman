// A global object representing the words

class Words {
  constructor(input) {
    this.words;
    if (typeof input === "string") {
      this.API = input;
      this.get = this.grabFromAPI || this.grabFromIframe;
    } else {
      this.get = this.grabLocally;
    }
  }
  // Grab locally a
  grabLocally(difficulty = 10) {
    difficulty = String(difficulty);
    const store = localStorage.getItem(`hangman-store-${difficulty}`);
    // Check if we have our JSON object in local storage,
    // if pick a random word (non-destructively so as
    // to preserve randomness) to present to user.
    return new Promise(function(resolve, reject) {
      if (store !== null) {
        console.log('CACHE HIT LETS ROLL.');
        const data = JSON.parse(store);
        const wordsList = data[difficulty];
        const word = wordsList[Math.floor(Math.random(0, wordsList.length))];
        debugger;
        resolve(word);
      } else {
        console.log('I NEED TO FETCH JSON FROM SERVER, UGH HOLD ON.');
        fetch('words.json')
          .then(response => {
            if (response.ok) return response.json();
            throw new Error('Fetch request failed 😨.');
          })
          .then(data => {
            for (let key in data) {
              if (data.hasOwnProperty(key)) {
                localStorage.setItem(`hangman-store-${key}`, JSON.stringify(data[key]));
              }
            }
            const wordsList = data[difficulty];
            const word = wordsList[Math.floor(Math.random(0, wordsList.length))];
            resolve(word);
          })
          .catch(err => reject(err));
      }
    });
  }
}

// A small test of our Words service as is.
const n = new Words({});
n.get(10).then(word => {
  console.log(`Here is my word: ${word}`);
});
