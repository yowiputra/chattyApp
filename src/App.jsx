import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import randomHexColor from 'random-hex-color';

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
      notifContent: '',
      countText: '',
      userColor: randomHexColor()
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleOnMessage = this.handleOnMessage.bind(this);
  }

  addMessage(newMessage){
    ws.send(JSON.stringify(newMessage));
  }

  changeName(newName){
    const notif = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newName}`
    }
    ws.send(JSON.stringify(notif));
    this.setState({
      currentUser: {name: newName},
    });
  }

  handleOnMessage(event){
    const receivedData = JSON.parse(event.data);
    console.log(receivedData);
    switch(receivedData.type){
      case "incomingMessage":
        const updatedMessages = this.state.messages.concat(receivedData);
        this.setState({
          messages: updatedMessages,
          notifContent: ''
        });
        break;

      case "incomingNotification":
        this.setState({notifContent: receivedData.content});
        break;

      case "connectedUserCount":
        const count = receivedData.count;
        let userText = 'users';
        if(count === 1){
          userText = 'user';
        }
        this.setState({countText: `${count.toString()} ${userText} online`});
        break;

      default:
        throw new Error("Unknown event type " + receivedData.type);
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-count">{this.state.countText}</span>
        </nav>
        <MessageList messages={this.state.messages} receivedNotif={this.state.notifContent}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeName={this.changeName} userColor={this.state.userColor}/>
      </div>
    );
  }
}

export default App;
