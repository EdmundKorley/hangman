/*
Display real-time infomation about the current game session
*/

class Status extends React.Component {
  render() {
    const freebie = !this.props.guessesLeft ? "(freebie 😉)" : "";
    return (<div className="hangman-status">Guesses left: {this.props.guessesLeft} {freebie}</div>);
  }
}
