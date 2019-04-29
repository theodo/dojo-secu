import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

export const MainContainer = styled.div`
  text-align: center;
`;

MainContainer.displayName = 'MainContainer';

export const Header = styled.div`
  background-color: ${colorUsage.headerBackground};
  height: 180px;
  padding: ${getSpacing(4)};
`;

Header.displayName = 'Header';

export const Logo = styled.img`
  animation: logo-spin infinite 20s linear;
  height: 80px;

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

Logo.displayName = 'Logo';
