import styled from 'styled-components';
import { colorUsage, fontSize, getSpacing } from 'stylesheet';

export const ButtonContainer = styled.div`
  text-align: center;
  height: 40px;
  padding: ${getSpacing(1)};
  font-size: ${fontSize.small};
`;

ButtonContainer.displayName = 'ButtonContainer';
