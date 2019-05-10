import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import StyledProfile from './Profile.style';

class Profile extends Component {
  render() {
    return (
      <StyledProfile>
        <FormattedMessage id="please.change.me" />
      </StyledProfile>
    );
  }
}

export default Profile;
