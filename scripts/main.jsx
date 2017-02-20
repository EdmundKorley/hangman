/*
A simple implementation of the Hangman game.
*/

class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	keys: new Set(),
      settings: {
        difficulty: 10,
        shape: 'lion',
      },
      words: '',
      guessesLeft: 6,
    }
    this.addKeys = this.addKeys.bind(this);
    this.refreshGame = this.refreshGame.bind(this);
  }
  // When this component first renders (happens once), lets fetch the first word from our words service
  componentDidMount() {
    wordService.get(this.state.settings.difficulty).then(function(word) {
      this.state.words = word;
      this.setState(this.state);
    }.bind(this));
  }
  // Re-render our components based on the current state of the game apropros
  refreshGame(settings) {
    this.state.settings.difficulty = settings.difficulty;
    this.state.settings.shape = settings.shape;
    this.state.keys = new Set();
    this.state.guessesLeft = 6;
    wordService.get(this.state.settings.difficulty).then(function(word) {
      this.state.words = word;
      this.setState(this.state);
    }.bind(this));
  }
  // Called when the user presses on a key
  addKeys(letter) {
    this.state.keys.add(letter);
    const correctGuesses = new Set(this.state.words.split('').filter(w => this.state.keys.has(w)));
    const newState = {
      keys: this.state.keys,
      settings: this.state.settings,
      words: this.state.words,
      guessesLeft: 6 - (this.state.keys.size - correctGuesses.size),
    }
    this.setState(newState);
  }
  render() {
    // If user has run out of turns,
    if (this.state.guessesLeft == 0) {
      // And won, tell them.
      if (this.state.words.split('').every(function (letter) {
        return this.state.keys.has(letter);
      }.bind(this))) {
        alert(`You won!\n\nVisit https://wordnik.com/words/${this.state.words} for the definition of ${this.state.words}.`);
      } else { // Else, tell them they lost.
        alert(`You lost!\n\nVisit https://wordnik.com/words/${this.state.words} for the definition of ${this.state.words}.`);
      }
      // Then reset the game
      this.refreshGame({ difficulty: this.state.difficulty, shape: this.state.shape });
    }
    const piecesToDraw = 6 - this.state.guessesLeft;
    const shape = window[this.state.settings.shape];
    let hangmanDrawing;
    switch (this.state.settings.shape) {
      case 'lion':
        hangmanDrawing = <Drawing toShow={piecesToDraw} animal={lion} />
        break;
      default:
        hangmanDrawing = <Drawing toShow={piecesToDraw} animal={crocodile} />;
    }
    return (<div>
        <h1>Hangman 😨</h1>
        <Keys words={this.state.words} keys={this.state.keys} />
        {hangmanDrawing}
        <Status guessesLeft={this.state.guessesLeft} />
        <Keyboard keysTouched={this.state.keys} keyListener={this.addKeys}/>
        <Settings signalRefresh={this.refreshGame} />
      </div>);
  }
}

const mountNode = document.getElementById('hangman');
ReactDOM.render(<Hangman />, mountNode);
