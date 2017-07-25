import React, {Component} from 'react';

class Message extends Component {
  componentDidMount(){
    console.log("Mounted Message");
  }

  render() {
    const messageUserName = <span className="message-username">{this.props.username}</span>;
    const messageContent = <span className="message-content">{this.props.content}</span>;
    return (
      <div className="message" key={this.props.id}>
        {messageUserName}
        {messageContent}
      </div>
    );
  }
}

export default Message;
