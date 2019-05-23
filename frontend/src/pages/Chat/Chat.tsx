import React, {Component, Fragment} from 'react';

import StyledChat from './Chat.style';
import {makeGetRequest} from "services/networking/request";
import {StyledLevel3Button, StyledLevel3Container, StyledLevel3Input} from "components/Level3/Level3.style";

interface ChatProps {
  match: any;
}

interface ChatState {
  messages: any
}

class Chat extends Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = { messages: [] };
  }

  fetchChat = (id: number) => {
    const request = makeGetRequest('/api/chat/'+id);
    request
        .then(response => {
          this.setState({...this.state, messages: response.body});
        })
  };

  displayMessages = () => {
    let messages: any = [];

    this.state.messages && this.state.messages.forEach((message: any) => {
      const dangerousMessage = {__html: message.text};
      messages.push(<div dangerouslySetInnerHTML={dangerousMessage}/>)
    });

    return <ul>{messages}</ul>
  };

  componentDidMount() {
    const { match: { params } } = this.props;

    this.fetchChat(params.id);
  }

  render() {
    return (
        <Fragment>
          {this.displayMessages()}
        </Fragment>

    );
  }
}

export default Chat;
