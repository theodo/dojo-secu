import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import StyledProfile from './Profile.style';

interface ProfileProps {
  levelUp: () => void;
}

class Profile extends Component<ProfileProps> {
  render() {
    return (
      <StyledProfile>
        <FormattedMessage id="please.change.me" />
          <button disabled type="button" onClick={this.props.levelUp}>Level up !</button>
      </StyledProfile>
    );
  }
}

export default Profile;
