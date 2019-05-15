import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';


export const MainContainer = styled.div`
  height: 100%;
`;

MainContainer.displayName = 'MainContainer';

export const Header = styled.div`
  background-color: ${colorUsage.headerBackground};
  height: 100px;
  padding: ${getSpacing(4)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

Header.displayName = 'Header';

export const Logo = styled.img`
  height: 80px;
`;

Logo.displayName = 'Logo';
