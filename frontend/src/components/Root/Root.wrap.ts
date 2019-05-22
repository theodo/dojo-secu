import Root from './Root';

import { connect } from 'react-redux';
import { RootState } from "redux/types";

const mapStateToProps = (state: RootState) => ({
    userRoles: state.user.userRoles
});


export default connect(mapStateToProps)(
    Root
);
