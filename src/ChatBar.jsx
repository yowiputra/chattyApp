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
    this.userNameChangeHandler = this.userNameChangeHandler.bind(this);
    this.contentChangeHandler = this.contentChangeHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  createNewMessage(){
    return {
      username: this.state.username,
      content: this.state.content
    }
  }

  userNameChangeHandler(event){
    let name = '';
    if(!event.target.value){
      name = 'Anonymous';
    } else {
      name = event.target.value;
    }
    this.setState({username: name});
  }

  contentChangeHandler(event){
    this.setState({content: event.target.value});
  }

  keyDownHandler(event){
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
      onChange={this.userNameChangeHandler}/>;

    const messageInput = <input
      className="chatbar-message"
      placeholder="Type a message and hit ENTER"
      onChange={this.contentChangeHandler}
      onKeyDown={this.keyDownHandler}/>;

    return(
      <footer className="chatbar">
        {userNameInput}
        {messageInput}
      </footer>
    );
  }
}

export default ChatBar;
