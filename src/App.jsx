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
    ws.onmessage = this.handleOnMessage;
  }

  constructor(){
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      notifContent: ''
    };
    this.addMessage = this.addMessage.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.handleOnMessage = this.handleOnMessage.bind(this);
  }

  addMessage(newMessage){
    ws.send(JSON.stringify(newMessage));
  }

  addNotification(newNotif){
    ws.send(JSON.stringify(newNotif));
  }

  handleOnMessage(event){
    const receivedData = JSON.parse(event.data);
    console.log(receivedData);
    switch(receivedData.type){
      case "incomingMessage":
        const updatedMessages = this.state.messages.concat(receivedData);
        this.setState({messages: updatedMessages});
        break;
      case "incomingNotification":
        this.setState({notifContent: receivedData.content});
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} receivedNotif={this.state.notifContent}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} addNotif={this.addNotification}/>
      </div>
    );
  }
}

export default App;
