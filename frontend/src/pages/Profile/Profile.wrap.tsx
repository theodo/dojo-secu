import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Profile from './Profile';
import { RootState } from "redux/types";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    goToLevelFour: (accessCode: string) => dispatch({type: 'Profile/GO_TO_LEVEL_FOUR_REQUEST', payload: accessCode}),
    goToLevelTwo: () => dispatch({type: 'Profile/GO_TO_LEVEL_TWO_REQUEST'}),
    fetchUserRoles: () => dispatch({type: 'Profile/FETCH_USER_ROLES_REQUEST'}),
});

const mapStateToProps = (state: RootState) => ({
    userRoles: state.user.userRoles
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Profile
);
