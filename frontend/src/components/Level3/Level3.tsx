import React, { Component, Fragment } from 'react';
import { makeGetRequest } from 'services/networking/request';

import { StyledLevel3Container, StyledLevel3Button } from './Level3.style';

interface Level3Props {
  goToLevelFour: (accessCode: string) => void;
};

interface Level3State {
  accessCode: string;
  corporals: any;
}

class Level3 extends Component<Level3Props, Level3State> {

  constructor(props: Level3Props) {
    super(props);
    this.state = { accessCode: '', corporals: null };
  }

  fetchCorporals = () => {
    const request = makeGetRequest('/api/army', {rank: "'corporal'"});
    request
      .then(response => {
        this.setState({...this.state, corporals: response.body});
      })
  }

  displayCorporals = () => {
    let corporals: any = [];

    this.state.corporals && this.state.corporals.forEach((element: any) => 
    corporals.push(<li>{`${element['first_name']} ${element['last_name']}`}</li>)
    )

    return <ul>{corporals}</ul>
  }

  goToLevelFour = () => {
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
        <input value={this.state.accessCode} onChange={this.handleChange}/>
        <StyledLevel3Container>
          <StyledLevel3Button
              data-disable-the-button
              type="button"
              onClick={this.goToLevelFour}
              id="first-level-button"
          >
              Enter the corporal zone :
          </StyledLevel3Button>
        </StyledLevel3Container>

        <h2> 
          You must have a valid access code to enter the corporal zone. 
          Only these corporals have been granted the codes :
        </h2>
        <br />
        {this.displayCorporals()}
      </Fragment>

    );
  }
}

export default Level3;
