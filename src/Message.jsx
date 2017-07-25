import React, {Component} from 'react';

class Message extends Component {
  render() {
    const messageUserName = <span className="message-username">Bob</span>;
    const messageContent = <span className="message-content">Has anyone seen my marbles?</span>;

    return (
      <div className="message">
        {messageUserName}
        {messageContent}
      </div>
    );
  }
}

export default Message;
