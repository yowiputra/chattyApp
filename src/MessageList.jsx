import React, {Component} from 'react';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        id: '1',
        username: 'Anonymous1',
        content: 'I won\'t be impressed with technology until I can download food.'
      }]
    };
  }

  addMessage(username, content) {
   const newMessage = {
     id: Math.random(),
     username: username,
     content: content
   };
   const newMessages = this.state.messages.concat(newMessage);
   this.setState({
     messages: newMessages
   });
 }

  render() {
    return (
      <div>
        <main className="messages">
          <Message messageContent={this.state.messages} />
          <div className="message system">
          </div>
        </main>
        <ChatBar sendMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}

export default MessageList;
