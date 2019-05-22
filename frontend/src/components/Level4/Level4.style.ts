import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

export const StyledLevel4Input = styled.input`
  margin: auto;
  margin-bottom: 20px;
  display: block;
  height: 20px;
  width: 180px;
  padding: 10px;
  border-radius: 5px;
`;

export const StyledLevel4Button = styled.button`
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

export const StyledLevel4Container = styled.div`
  display: flex;
  justify-content: center
  margin-bottom: 50px
`;

StyledLevel4Button.displayName = 'StyledLevel4Button';
StyledLevel4Container.displayName = 'StyledLevel4Container';
