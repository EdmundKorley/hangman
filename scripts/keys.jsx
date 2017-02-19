/*
Render the corrected guessed letters and letters to be guessed.
*/

class Keys extends React.Component {
  render() {
    const keysDiv = this.props.words.split('').map((letter) => {
      return (<div>{this.props.keys.has(letter) ? letter : '_'}</div>);
    });
    return (<div className="hangman-keys">{keysDiv}</div>);
  }
}
