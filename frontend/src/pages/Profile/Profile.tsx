import React, { Component } from 'react';

import StyledProfile from './Profile.style';
import Level4 from "components/Level4";
import Level3 from "components/Level3";
import Level2 from "components/Level2";
import Level1 from "components/Level1";
import Level5 from "components/Level5";
import FinalPage from "components/FinalPage";

import getRoleFromUserRoles from "../../services/levelMapper";

interface ProfileProps {
  goToLevelTwo: () => void;
  goToLevelFour: (accessCode: string) => void;
  goToLevelFive: (accessCode: string) => void;
  fetchUserRoles: () => void;
  userRoles: Array<string> | null
}

interface ProfileState {
  isButtonDisabled: boolean
}

class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = { isButtonDisabled: true };
    this.props.fetchUserRoles();
  }

  render() {
    let levelPage = <div />;

    switch (getRoleFromUserRoles(this.props.userRoles)) {
      case 'level_six':
        levelPage = <FinalPage />;
        break;
      case 'level_five':
        levelPage = <Level5 />;
        break;
      case 'level_four':
        levelPage = <Level4 goToLevelFive={this.props.goToLevelFive}/>;
        break;
      case 'level_three':
        levelPage = <Level3 goToLevelFour={this.props.goToLevelFour}/>;
        break;
      case 'level_two':
        levelPage = <Level2 />;
        break;
      case 'level_one':
        levelPage = <Level1 goToLevelTwo={this.props.goToLevelTwo}/>;
        break;
      default:
        break;
    }

    return (
      <StyledProfile>
          {levelPage}
      </StyledProfile>
    );
  }
}

export default Profile;
