/*
 * A drawing component that uses SVG paths to draw and segment the hangman.
 */

class Drawing extends React.Component {
	render() {
		// We need to reset the pieces when the player loses
		if (this.props.toShow == 0) {
			for (let j = 0; j < Math.min(this.props.toShow, 6); j++) {
				let piece = document.getElementById(this.props.animal.ids[j]);
				piece.style.visibility = 'hidden';
			}
		} else {
			// For however many tries the user got wrong, draw a hangman piece
			for (let i = 0; i < Math.min(this.props.toShow, 6); i++) {
				let piece = document.getElementById(this.props.animal.ids[i]);
				piece.style.visibility = 'visible';
			}
		}
		// We make ourselves vulnerable to cross-site scripting here and this is the kinda thing a state management solution would help us avoid.
		return (<div id="hangman-shape" dangerouslySetInnerHTML={{ __html: this.props.animal.svg }} />);
	}
}
