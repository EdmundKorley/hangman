class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	keys: new Set(),
    }
    this.addKeys = this.addKeys.bind(this);
  }
  addKeys(letter) {
    this.state.keys.add(letter);
    const newState = {
      keys: this.state.keys,
    }
    this.setState(newState);
  }
  render() {
    return (<div>
        <Settings signalRefresh={function(arg) { console.log('TO IMPLEMENT: REFRESH STATE', arg); }} />
        <Drawing animal={crocodile} toShow={6} />
        <Keyboard keysTouched={this.state.keys} keyListener={this.addKeys}/>
      </div>);
  }
}

const mountNode = document.getElementById('hangman');
ReactDOM.render(<Hangman />, mountNode);
