import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Dispatch } from 'redux';

import Profile from './Profile';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    editThisFunction() {},
  };
};

export default connect(null, mapDispatchToProps)(
  Profile
);
