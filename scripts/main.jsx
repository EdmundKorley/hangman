class Hangman extends React.Component {
  render() {
    return (<div>
        <Settings signalRefresh={function(arg) { console.log('TO IMPLEMENT: REFRESH STATE', arg); }} />
        <Drawing animal={crocodile} toShow={6} />
      </div>);
  }
}

const mountNode = document.getElementById('hangman');
ReactDOM.render(<Hangman />, mountNode);
