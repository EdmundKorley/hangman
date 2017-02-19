/*
 * A drawing component that uses SVG paths to draw and segment the hangman.
 */
class Drawing extends React.Component {
	componentDidMount() {
		const node = document.getElementById('hangman-shape');
		node.innerHTML = this.props.animal.svg;
		console.log(this.props.toShow);
		for (var i = 0; i < this.props.toShow; i++) {
			let piece = document.getElementById(this.props.animal.ids[i]);
			piece.style.visibility = 'visible';
		}
	}
	render() {
		return (<div>
							<div id="hangman-shape"></div>
						</div>);
	}
}
