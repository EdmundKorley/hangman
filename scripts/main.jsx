class Hangman extends React.Component {
  render() {
    return (<div>
        <Settings refreshHangman={function() { console.log('TO IMPLEMENT: REFRESH STATE'); }} />
      </div>);
  }
}

const mountNode = document.getElementById('hangman');
ReactDOM.render(<Hangman />, mountNode);
