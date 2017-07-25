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
  }

  userNameCheck(){
    if(this.state.username === ''){
      this.setState({username: 'Anonymous'});
    }
  }

  createNewMessage(){
    return {
      id: Math.random(),
      username: this.state.username,
      content: this.state.content
    }
  }

  keyDownHandler(event){
    if (event.key === 'Enter'){
      this.userNameCheck();
      const newMessage = this.createNewMessage();
      this.props.addMessage(newMessage);
      event.target.value = '';
      this.setState({content: ''});
    }
  }

  render() {
    const userNameInput = <input
      className="chatbar-username"
      placeholder="Your Name (Optional)"
      defaultValue={this.props.currentUser.name}
      onChange={(event)=>{
        this.setState({username: event.target.value})
      }}/>;

    const messageInput = <input
      className="chatbar-message"
      placeholder="Type a message and hit ENTER"
      onChange={(event)=>{
        this.setState({content: event.target.value})
      }}
      onKeyDown={this.keyDownHandler.bind(this)}/>;

    return(
      <footer className="chatbar">
        {userNameInput}
        {messageInput}
      </footer>
    );
  }
}

export default ChatBar;
