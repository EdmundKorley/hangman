/*
A Settings component that manipulates the global settings configurations.
*/
class Settings extends React.Component {
  pullFormData() {
    const hangmanForm = document.forms[0];
    if (hangmanForm) {
      return {
          difficulty: Number(hangmanForm.difficulty.value),
          shape: hangmanForm.shape.value || "tiger",
      };
    }
  }
  render() {
    return (<div className="settings">
      <form>
        <label>
          <strong>Difficulty</strong><br/>
          😇 <input type="range" name="difficulty" min="1" max="10" /> 😈
        </label>
        <br/>
        <br/>
        <strong>Hangman Style</strong>
        <br/>
        <label>
          <input type="radio" name="shape" value="lion" />
          &nbsp;&nbsp;🦁
        </label>
        &nbsp;&nbsp;&nbsp;
        <label>
          <input type="radio" name="shape" value="tiger" />
          &nbsp;&nbsp;🐯
        </label>
        &nbsp;&nbsp;&nbsp;
        <label>
          <input type="radio" name="shape" value="crocodile" />
          &nbsp;&nbsp;🐊
        </label>
        &nbsp;&nbsp;&nbsp;
        <label>
          <input type="radio" name="shape" value="snake" />
          &nbsp;&nbsp;🐍
        </label>
        <br/>
        <br/>
        <label>
          <input type="button" onClick={() => this.props.signalRefresh(this.pullFormData())} value="Refresh" />
        </label>
      </form>
    </div>);
  }
}
