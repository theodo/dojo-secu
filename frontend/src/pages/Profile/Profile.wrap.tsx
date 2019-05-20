import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Profile from './Profile';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    levelUp: () => dispatch({type: 'Profile/LEVEL_UP_REQUEST'}),
});

export default connect(null, mapDispatchToProps)(
  Profile
);
