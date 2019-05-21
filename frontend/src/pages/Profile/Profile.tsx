import React, { Component } from 'react';

import StyledProfile from './Profile.style';
import Level2 from "components/Level2";
import Level1 from "components/Level1";

interface ProfileProps {
  goToLevelTwo: () => void;
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

  componentDidMount() {
    const config = { attributes: true };
    const button = window.document.getElementById("first-level-button");
    if (button) {
      const observer = new MutationObserver(() => {
        const button = window.document.getElementById("first-level-button");
        if (button) {
          const disableAttribute = button.getAttribute("data-disable-the-button");
          this.setState({ isButtonDisabled: disableAttribute ? disableAttribute === "true" : false })
        }
      });
      // Start observing the target node for configured mutations
      observer.observe(button, config);
    }
  }

  goToLevelTwo = () => {
      if (this.state.isButtonDisabled) {
          return
      } else {
          this.props.goToLevelTwo();
      }
  };

  getRoleFromUserRoles = () => {
      const { userRoles } = this.props;
      if (userRoles) {
          if (userRoles.includes('deba90042e6610e4a87d4d6711f61f774a1808b0')) {
              return 'level_four';
          } else if (userRoles.includes('370315690cfb42749c656c302369ce14291e1380')) {
              return 'level_three';
          } else if (userRoles.includes('a59ca43c08454e124ed252830b811dd63649e62a')) {
              return 'level_two';
          } else {
              return 'level_one';
          }
      } else {
          return null;
      }
  };

  render() {
    let levelPage = <div />;

    switch (this.getRoleFromUserRoles()) {
      case 'level_two':
        levelPage = <Level2 />;
        break;
      case 'level_one':
        levelPage = <Level1 goToLevelTwo={this.goToLevelTwo}/>;
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
