import styled from 'styled-components';
import { colorUsage} from "stylesheet";

export const LoginContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: ${colorUsage.headerBackground}
`;

LoginContainer.displayName = 'LoginContainer';

export const Token = styled.pre`
    max-width: 400px;
    word-break: break-all;
    white-space: pre-wrap;
`;

Token.displayName = 'Token';

export const FieldContainer = styled.pre`
    color: white;
`;

FieldContainer.displayName = 'FieldContainer';
