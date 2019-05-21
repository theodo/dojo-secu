import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Profile from './Profile';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    goToLevelTwo: () => dispatch({type: 'Profile/GO_TO_LEVEL_TWO_REQUEST'}),
    fetchUserRoles: () => dispatch({type: 'Profile/FETCH_USER_ROLES_REQUEST'}),
});

export default connect(null, mapDispatchToProps)(
  Profile
);
