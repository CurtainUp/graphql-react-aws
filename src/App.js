import React, { Component } from 'react';
import CreateReceipt from './createReceipt';
import DisplayReceipts from './displayReceipts';


class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateReceipt />
        <DisplayReceipts />
      </div>
    );
  }
}

export default App;
