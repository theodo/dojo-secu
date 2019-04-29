import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { getUserToken } from 'redux/Login';
import { logoutUser } from 'redux/Login/actions';
import { RootState } from 'redux/types';
import LogoutButton from './LogoutButton';

const mapStateToProps = (state: RootState) => ({
    isUserLoggedIn: !!getUserToken(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => {
        dispatch(logoutUser);
        dispatch(push('/login'));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogoutButton);
