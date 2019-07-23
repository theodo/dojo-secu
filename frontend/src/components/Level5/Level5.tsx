import React, { Component, Fragment } from 'react';
import {makeGetRequest, makePostRequest} from 'services/networking/request';
import {StyledLevel3Button, StyledLevel3Container, StyledLevel3Input} from "components/Level3/Level3.style";
import {StyledLevel5Text} from "components/Level5/Level5.style";

// import { StyledLevel5Container, StyledLevel5Button, StyledLevel5Input } from './Level5.style';

interface Level5Props {}

interface Level5State {
  messageText: string;
  messages: any;
}

class Level5 extends Component<Level5Props, Level5State> {

  constructor(props: Level5Props) {
    super(props);
    this.state = { messageText: '', messages: [] };
  }

  fetchChat = () => {
    const request = makeGetRequest('/api/chat');
    request
        .then(response => {
          this.setState({...this.state, messages: response.body});
        })
  };

  postMessage = () => {
    const request = makePostRequest('/api/messages', {text: this.state.messageText});
    request.then(() => {
          this.fetchChat();
          this.setState({...this.state, messageText: ''})
        })
  };

  displayMessages = () => {
    let messages: any = [];

    this.state.messages && this.state.messages.forEach((message: any) => {
      const dangerousMessage = {__html: message.text};
      const style = {
        "margin": "auto",
        "margin-bottom": "20px",
        "display": "block",
        "height": "30px",
        "width": "250px",
        "padding": "10px",
        "border-radius": "5px",
      };
      messages.push(<div style={style}>
            <p>{message.createdAt.date}</p>
            <div dangerouslySetInnerHTML={dangerousMessage}/>
            <p>By {message.email}</p>
          </div>
        )
    });

    return <ul>{messages}</ul>
  };

  handleChange = (event: any) => {
    this.setState({ messageText: event.target.value })
  };

  componentDidMount() {
    this.fetchChat();
  };

  render() {
    return (
      <Fragment>
        <StyledLevel5Text>
          Welcome to your secure chat with our supreme leader.
        </StyledLevel5Text>
        {this.displayMessages()}
        <StyledLevel3Input placeholder='New message' value={this.state.messageText} onChange={this.handleChange}/>
        <StyledLevel3Container>
          <StyledLevel3Button
              data-disable-the-button
              type="button"
              onClick={this.postMessage}
          >
            Publish
          </StyledLevel3Button>
        </StyledLevel3Container>
      </Fragment>

    );
  }
}

export default Level5;
