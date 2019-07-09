import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

export const StyledLevel6Input = styled.input`
  margin: auto;
  margin-bottom: 20px;
  display: block;
  height: 20px;
  width: 180px;
  padding: 10px;
  border-radius: 5px;
`;

export const StyledLevel6Button = styled.button`
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

export const StyledLevel6 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const StyledLevel6Text = styled.h2`
  margin-bottom: ${getSpacing(5)};
`

StyledLevel6Button.displayName = 'StyledLevel6Button';
StyledLevel6.displayName = 'StyledLevel6';
StyledLevel6.displayName = 'StyledLevel6';
StyledLevel6Text.displayName = 'StyledLevel6Text';
