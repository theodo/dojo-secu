import React, { Component } from 'react';
import { makePutRequest } from 'services/networking/request';

import { StyledLevel2, StyledLevel2Button, StyledLevel2Error } from './Level2.style';



interface Level2Props {
};

interface Level2State {
  error: boolean
}

class Level2 extends Component<Level2Props, Level2State> {

  constructor(props: Level2Props) {
    super(props);
    this.state = { error: false }
  }

  levelUpRequest = () => {
    const query = {
      homeworld: 'Corellia',
      ship: 'Imperator',
      last_mission_place: 'Kashyyyk',
      i_am_squad_leader: false,
      target: 'Arowan',
      estimated_remaining_time : '274h'
    }
    const request = makePutRequest('/api/level-two/level-up', {}, query);
    request
      .then(() => {
        /*
          It is impossible to go in the .then in the application
          Because you cannot have a succesful response from the api
        */
      })
      .catch(() => {
        this.setState({error: true});
      })
  }

  render() {
    return (
      <StyledLevel2>
        <StyledLevel2Button onClick={this.levelUpRequest}>
          Become a squad leader !
        </StyledLevel2Button>
        { this.state.error && <StyledLevel2Error>You are not elected as squad leader</StyledLevel2Error> }
      </StyledLevel2>
    );
  }
}

export default Level2;
