import React, { Component } from 'react';
import { StyledLevel1Button } from './Level1.style';

interface Level1Props {
    goToLevelTwo: () => void;
}

class Level1 extends Component<Level1Props> {

  render() {
    return (
        <StyledLevel1Button
            data-disable-the-button
            type="button"
            onClick={this.props.goToLevelTwo}
            id="first-level-button"
        >
            Become a trooper !
        </StyledLevel1Button>
    );
  }
}

export default Level1;
