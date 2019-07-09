import React, { Component } from 'react';

import {StyledLevel6Button, StyledLevel6, StyledLevel6Input, StyledLevel6Text} from './Level6.style';

interface IProps {
};

class Level6 extends Component<IProps> {
  render() {
    return (
      <StyledLevel6>
        <StyledLevel6Text>
          Please, enter your +1 name and age for the death star's great opening
        </StyledLevel6Text>
        <StyledLevel6Input placeholder='Name' />
        <StyledLevel6Input placeholder='Age' />
        <StyledLevel6Button
              type='button'
          >
              Send
          </StyledLevel6Button>
      </StyledLevel6>
    );
  }
}

export default Level6;
