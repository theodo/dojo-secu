import React, { Component, Fragment } from 'react';
import { makeGetRequest } from 'services/networking/request';

import { StyledLevel4Container, StyledLevel4Button, StyledLevel4Input } from './Level4.style';

interface Level4Props {
  goToLevelFive: (accessCode: string) => void;
};

interface Level4State {
  accessCode: string;
}

class Level4 extends Component<Level4Props, Level4State> {

  constructor(props: Level4Props) {
    super(props);
    this.state = { accessCode: '' };
  }

  goToLevelFive = () => {
    this.props.goToLevelFive(this.state.accessCode);
  }

  handleChange = (event: any) => {
    this.setState({ accessCode: event.target.value })
  }

  render() {
    return (
      <Fragment>
        <StyledLevel4Input placeholder='Enter your access code' value={this.state.accessCode} onChange={this.handleChange}/>
        <StyledLevel4Container>
          <StyledLevel4Button
              data-disable-the-button
              type="button"
              onClick={this.goToLevelFive}
              id="first-level-button"
          >
              Access the commander zone
          </StyledLevel4Button>
        </StyledLevel4Container>
      </Fragment>

    );
  }
}

export default Level4;
