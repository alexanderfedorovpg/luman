import styled from 'styled-components';
import { rem, ifProp } from 'utils/style';

export const Wrapper = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;

    font-size: ${rem(12)};
    line-height: (26/12);
    text-transform: uppercase;
    color: #336699;

    list-style: none;
`;

export const Item = styled.li`
    cursor: pointer;

    ${ifProp('active')(`
        font-weight: 700;
        color: #000;
    `)}

    &:not(:last-child) {
        margin-right: ${rem(15)};
    }
`;
