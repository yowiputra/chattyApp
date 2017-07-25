import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const userNameInput = <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>;
    const messageInput = <input className="chatbar-message" placeholder="Type a message and hit ENTER" />;
    return(
      <footer className="chatbar">
        {userNameInput}
        {messageInput}
      </footer>
    );
  }
}

export default ChatBar;
