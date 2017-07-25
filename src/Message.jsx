import React, {Component} from 'react';

class Message extends Component {
  render() {
    const messageUserName = this.props.messageContent.map((message)=>{
      return <span className="message-username" key={message.id}>{message.username}</span>
    });
    const messageContent = this.props.messageContent.map((message)=>{
      return <span className="message-content" key={message.id}>{message.content}</span>
    });

    return (
      <div className="message">
        {messageUserName}
        {messageContent}
      </div>
    );
  }
}

export default Message;
