import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const ws = new WebSocket("ws://0.0.0.0:3001");

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount <App />");
    ws.onopen = function(event){
      console.log('Connected to server');
    };
    ws.onmessage = this.receiveMessage;
  }

  constructor(){
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  receiveMessage(event){
    console.log(`RECEIVE: ${JSON.parse(event.data)}`);
    const updatedMessages = this.state.messages.concat(JSON.parse(event.data));
    this.setState({messages: updatedMessages});
  }

  addMessage(newMessage){
    console.log(`SEND: ${JSON.stringify(newMessage)}`);
    ws.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
