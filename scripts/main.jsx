class Hangman extends React.Component {
  render() {
    return (<div>
        <Settings signalRefresh={function(arg) { console.log('TO IMPLEMENT: REFRESH STATE', arg); }} />
        <div id="words"></div>
      </div>);
  }
}

const mountNode = document.getElementById('hangman');
ReactDOM.render(<Hangman />, mountNode);
