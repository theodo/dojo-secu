import styled from 'styled-components';

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

MessageContainer.displayName = 'MessageContainer';

export const Token = styled.pre`
    max-width: 400px;
    word-break: break-all;
    white-space: pre-wrap;
`;

Token.displayName = 'Token';
