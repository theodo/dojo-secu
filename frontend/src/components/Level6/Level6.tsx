import React, { Component } from 'react';
import Builder from 'xmlbuilder'

import {StyledLevel6Button, StyledLevel6, StyledLevel6Input, StyledLevel6Text} from './Level6.style';
import { makeXMLPostRequest } from 'services/networking/request'

interface Level6Props {
};

interface Level6State {
  guestName: string;
  guestAge: number;
}

class Level6 extends Component<Level6Props, Level6State> {

  constructor(props: Level6Props) {
    super(props);
    this.state = { guestName: '', guestAge: 0 };
  }

  handleAgeChange = (event: any) => {
    this.setState({ guestAge: event.target.value })
  }

  handleNameChange = (event: any) => {
    this.setState({ guestName: event.target.value })
  }

  submit = async () => {
    const data = {
      root: {
        info: {
          age: this.state.guestAge,
          name: this.state.guestName
        }
      }
    }
    const xmlData = Builder.create(data).end({pretty: true})
    const response = await  makeXMLPostRequest('/api/send-invite', xmlData)
  }

  render() {
    return (
      <StyledLevel6>
        <StyledLevel6Text>
          Please, enter your +1 name and age for the death star's great opening
        </StyledLevel6Text>
        <StyledLevel6Input placeholder='Name' value={this.state.guestName} onChange={this.handleNameChange} />
        <StyledLevel6Input placeholder='Age' value={this.state.guestAge} onChange={this.handleAgeChange} />
        <StyledLevel6Button
              type='button'
              onClick={this.submit}
          >
              Send
          </StyledLevel6Button>
      </StyledLevel6>
    );
  }
}

export default Level6;
