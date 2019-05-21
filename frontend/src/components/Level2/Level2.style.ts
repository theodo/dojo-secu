import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

export const StyledLevel2 = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledLevel2Button = styled.button`
  color: white;
  background-color: ${colorUsage.headerBackground};
  border: 5px white solid;
  border-radius: 10px;
  height: ${getSpacing(10)};
  width: ${getSpacing(40)};
`;

export const StyledLevel2Error = styled.span`
  color: red;
  font-size: bold;
`

StyledLevel2.displayName = 'StyledLevel2'
StyledLevel2Button.displayName = 'StyledLevel2Button'
StyledLevel2Error.displayName = 'StyledLevel2Error'
