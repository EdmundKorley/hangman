/*
Display real-time infomation about the current game session
*/

class Status extends React.Component {
  render() {
    return (<div className="hangman-status">Guesses left: {this.props.guessesLeft}</div>);
  }
}
