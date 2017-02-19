/*
Render a set of alphabetic ASCII keys with listeners on a given key,
that feed into the game logic of the parent component.
*/

class Keyboard extends React.Component {
  render() {
    let clickedKey = this.props.keyListener;
    let seenKeys = this.props.keysTouched;
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const lettersPlus = letters + " ,.!'";
    const characterSet = this.props.enablePhrases ? lettersPlus : letters;
    const keysDiv = characterSet.split('').map((letter) => {
      const styleName = `hangman-key ${seenKeys.has(letter) ? 'hangman-key-gray' : ''}`
      return (<div className={styleName} onClick={() => { clickedKey(letter); }}>{letter}</div>);
    });
    return (<div className="hangman-keyboard">{keysDiv}</div>);
  }
}
