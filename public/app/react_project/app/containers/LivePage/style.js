import styled from 'styled-components';
import { NewsList } from 'components/News';

export const StyledNewsList = styled(NewsList)`
    position: relative;
    z-index: 2;

    width: 60%;
    margin-top: -.5rem;
    flex-shrink: 0;
`;
