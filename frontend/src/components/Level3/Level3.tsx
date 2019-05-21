import React, { Component, Fragment } from 'react';
import { makeGetRequest } from 'services/networking/request';

import { StyledLevel3Container, StyledLevel3Button } from './Level3.style';

interface Level3Props {
  goToLevelFour: (accessCode: string) => void;
};

interface Level3State {
  accessCode: string;
  corporals: Array<object>;
}

class Level3 extends Component<Level3Props, Level3State> {

  constructor(props: Level3Props) {
    super(props);
    this.state = { accessCode: '', corporals: [] };
  }

  fetchCorporals = () => {
    const request = makeGetRequest('/api/army', {rank: "corporal"});
    request
      .then(response => {
        console.log(response);
        this.setState({corporals: response});
      })
  }

  goToLevelFour = () => {
    const input = window.document.getElementById("third-level-input");
    this.props.goToLevelFour(this.state.accessCode);
  }

  handleChange = (event: any) => {
    this.setState({ accessCode: event.target.value })
  }

  componentDidMount() {
    this.fetchCorporals();
  }

  render() {
    return (
      <Fragment>
        <input  value={this.state.accessCode} onChange={this.handleChange}/>
        <StyledLevel3Container>
          <StyledLevel3Button
              data-disable-the-button
              type="button"
              onClick={this.goToLevelFour}
              id="first-level-button"
          >
              Enter the corporal zone
          </StyledLevel3Button>
        </StyledLevel3Container>
      </Fragment>

    );
  }
}

export default Level3;
