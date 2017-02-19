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
    }
    this.addKeys = this.addKeys.bind(this);
  }
  componentDidMount() {
    wordService.get(this.state.settings.difficulty).then(function(word) {
      this.state.words = word;
      this.setState(this.state);
    }.bind(this));
  }
  addKeys(letter) {
    this.state.keys.add(letter);
    const newState = {
      keys: this.state.keys,
      settings: this.state.settings,
      words: this.state.words
    }
    this.setState(newState);
  }
  render() {
    return (<div>
        <Settings signalRefresh={function(arg) { console.log('TO IMPLEMENT: REFRESH STATE', arg); }} />
        <Drawing animal={crocodile} toShow={6} />
        <Keys words={this.state.words} keys={this.state.keys} />
        <Keyboard keysTouched={this.state.keys} keyListener={this.addKeys}/>
      </div>);
  }
}

const mountNode = document.getElementById('hangman');
ReactDOM.render(<Hangman />, mountNode);
