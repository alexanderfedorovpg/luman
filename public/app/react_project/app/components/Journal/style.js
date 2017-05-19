import styled from 'styled-components';
import Table from 'components/Table';

export const Wrapper = styled.div`
    padding-bottom: 2rem;
    margin-left: 1.5rem;
`;

export const StyledTable = styled(Table)`
    padding-bottom: .2rem;

    border-bottom: 2px solid #d2d2d2;
`;

export const MoreLink = styled.a`
    display: inline-block;
    margin-top: 1rem;

    font-size: .88em;
    text-decoration: none;
    letter-spacing: -.01rem;
`;
