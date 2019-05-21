import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

export const StyledLevel1Button = styled.button`
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

export const StyledLevel1Container = styled.div`
  display: flex;
  justify-content: center
`;

StyledLevel1Button.displayName = 'StyledLevel1Button';
StyledLevel1Container.displayName = 'StyledLevel1Container';
