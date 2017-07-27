import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message)=>{
      return <Message
        key={message.id}
        username={message.username}
        content={message.content}/>
    });

    return (
      <main className="messages">
        {messages}
        <div className="message system">
          <span key={this.props.receivedNotif.id}>{this.props.receivedNotif}</span>
        </div>
      </main>
    );
  }
}

export default MessageList;
