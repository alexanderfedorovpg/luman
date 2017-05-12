import styled from 'styled-components';
import Table from 'components/Table';

export const Profile = styled.div`
    display: flex;
    width: 100%;
`;

export const History = styled.div`
    margin-left: 1.5rem;
`;

export const HistoryTable = styled(Table)`
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
