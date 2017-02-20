/*
 * A drawing component that uses SVG paths to draw and segment the hangman.
 */

class Drawing extends React.Component {
	render() {
		// For however many tries the user got wrong, draw a hangman piece
		for (let i = 0; i < this.props.toShow; i++) {
			let piece = document.getElementById(this.props.animal.ids[i]);
			piece.style.visibility = 'visible';
		}
		// We make ourselves vulnerable to cross-site scripting here and this is the kinda thing a state management solution would help us avoid.
		return (<div id="hangman-shape" key={this.props.words} dangerouslySetInnerHTML={{ __html: this.props.animal.svg }} />);
	}
}
