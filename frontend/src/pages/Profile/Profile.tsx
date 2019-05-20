import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import StyledProfile from './Profile.style';

interface ProfileProps {
  goToLevelTwo: () => void;
}

interface ProfileState {
  isButtonDisabled: boolean
}

class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = { isButtonDisabled: true };
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

  render() {
    return (
      <StyledProfile>
          <button
              data-disable-the-button
              type="button"
              onClick={this.goToLevelTwo}
              id="first-level-button"
          >
            Become a trooper !
          </button>
      </StyledProfile>
    );
  }
}

export default Profile;
