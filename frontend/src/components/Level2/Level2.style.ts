import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

export const StyledLevel2 = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const StyledLevel2Button = styled.button`
  color: white;
  background-color: ${colorUsage.headerBackground};
  border: 5px white solid;
  border-radius: 10px;
  height: ${getSpacing(10)};
  width: ${getSpacing(40)};
  cursor: pointer;
  outline: none;

  &:active {
    color: black;
    background-color: white;
  }
`;

export const StyledLevel2Error = styled.span`
  color: red;
  padding: 10px;
  font-weight: bold;
  border: 2px red solid;
  border-radius: 8px;
  margin-top: 5px;
  font-size: 12px
`

StyledLevel2.displayName = 'StyledLevel2'
StyledLevel2Button.displayName = 'StyledLevel2Button'
StyledLevel2Error.displayName = 'StyledLevel2Error'
