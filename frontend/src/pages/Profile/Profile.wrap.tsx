import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Dispatch } from 'redux';

import Profile from './Profile';
import {levelUp} from "redux/Profile";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    levelUp: () => dispatch({type: 'Profile/LEVEL_UP_REQUEST'}),
});

export default connect(null, mapDispatchToProps)(
  Profile
);
