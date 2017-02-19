// A global object representing the words
class Words {
  constructor(input) {
    this.data = {};
    // If we pass in an API we'd like to pull from that
    // because it's more configurable (length of word, prefixes, offsets, etc),
    // but the server that words/ is on has CORS turned off
    // so we parse and pull a json file from our server.
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
    let member = this;
    // Check if we have our JSON object in local storage,
    // if pick a random word (non-destructively so as
    // to preserve randomness) to present to user.
    return new Promise(function(resolve, reject) {
      if (member.data[difficulty]) {
        const wordsList = member.data[difficulty];
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        const word = wordsList[randomIndex];
        resolve(word);
      } else {
        fetch('words.json')
          .then(response => {
            if (response.ok) return response.json();
            throw new Error('Fetch request failed 😨.');
          })
          .then(jsonData => {
            member.data = jsonData;
            const wordsList = jsonData[difficulty];
            const randomIndex = Math.floor(Math.random() * wordsList.length);
            const word = wordsList[randomIndex];
            resolve(word);
          })
          .catch(err => reject(err));
      }
    });
  }
}

// An intialization of a global words service
const wordService = new Words({});
