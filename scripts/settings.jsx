/*
A Settings component that manipulates the global settings configurations.
*/
class Settings extends React.Component {
  // When our component has been appropriately rendered,
  // be ready to pull form data
  componentDidMount() {
    const hangmanForm = document.forms[0];

  }
  render() {
    return (<div className="settings">
      <form>
        <label>
          <strong>Difficulty</strong><br/>
          1 <input type="range" name="hangman-difficulty" min="1" max="10" /> 10
        </label>
        <br/>
        <br/>
        <strong>Hangman Style</strong>
        <br/>
        <label>
          <input type="radio" name="hangman-shape" value="cowboy" />
          &nbsp;&nbsp;Cowboy
        </label>
        <br/>
        <label>
          <input type="radio" name="hangman-shape" value="cowgal" />
          &nbsp;&nbsp;Cowgal
        </label>
        <br/>
        <br/>
        <label>
          <input type="button" onClick={this.props.refreshHangman} value="Refresh" />
        </label>
      </form>
    </div>);
  }
}
