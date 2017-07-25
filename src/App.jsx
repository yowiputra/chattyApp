import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList />
      </body>
    );
  }
}

export default App;
