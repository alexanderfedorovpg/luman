import styled from 'styled-components';
import { rem } from 'utils/style';

const width = 1000;
const aspectRate = 16 / 9;

export const Player = styled.iframe`
    width: ${rem(width)};
    height: ${rem(width / aspectRate)};
`;
