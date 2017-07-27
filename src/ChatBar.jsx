import React, {Component} from 'react';

class ChatBar extends Component {
  componentDidMount(){
    console.log("Mounted ChatBar");
  }

  constructor(props){
    super();
    this.state = {
      username: props.currentUser.name,
      content: ''
    };
    this.messageContentChangeHandler = this.messageContentChangeHandler.bind(this);
    this.enterMessageContentHandler = this.enterMessageContentHandler.bind(this);
    this.enterUserNameHandler = this.enterUserNameHandler.bind(this);
  }

  createNewMessage(){
    return {
      type: "postMessage",
      username: this.props.currentUser.name,
      content: this.state.content
    }
  }

  enterUserNameHandler(event){
    if (event.key === 'Enter'){
      let name = '';
      if(!event.target.value){
        name = 'Anonymous';
      } else {
        name = event.target.value;
      }
      this.props.changeName(name);
    }
  }

  messageContentChangeHandler(event){
    this.setState({content: event.target.value});
  }

  enterMessageContentHandler(event){
    if (event.key === 'Enter'){
      this.props.addMessage(this.createNewMessage());
      event.target.value = '';
      this.setState({content: ''});
    }
  }

  render() {
    const userNameInput = <input
      className="chatbar-username"
      placeholder="Your Name (Optional)"
      defaultValue={this.props.currentUser.name}
      onKeyDown={this.enterUserNameHandler}/>;

    const messageInput = <input
      className="chatbar-message"
      placeholder="Type a message and hit ENTER"
      onChange={this.messageContentChangeHandler}
      onKeyDown={this.enterMessageContentHandler}/>;

    return(
      <footer className="chatbar">
        {userNameInput}
        {messageInput}
      </footer>
    );
  }
}

export default ChatBar;
