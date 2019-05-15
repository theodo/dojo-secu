import React, { ReactNode } from 'react';

import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { ButtonContainer } from './LogoutButton.style';

interface Props {
  isUserLoggedIn: boolean;
  logout: () => void;
}

const LogoutButton: React.FunctionComponent<Props> = (props: Props) => {
  const { isUserLoggedIn, logout } = props;

  return isUserLoggedIn ? (
    <ButtonContainer>
      <Button onClick={logout} variant="contained">
        <FormattedMessage id="header.deconnection-button" />
      </Button>
    </ButtonContainer>
  ) : null;
};

export default LogoutButton;
