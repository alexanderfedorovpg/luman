import styled from 'styled-components';

export const Wrapper = styled.dl`
    width: 44%;
    margin: 0;
    padding: 1.65rem 1.4rem;
`;

export const Item = styled.div`
    display: inline-flex;
    width: 49%;
    margin-bottom: .5rem;
`;

export const Name = styled.dt`
    margin: 0;

    font-size: .875rem;
    color: gray;

    &::after {
        content: ':'
    }
`;

export const Value = styled.dd`
    margin: 0;
    margin-left: .25em;

    font-size: .868rem;
    font-weight: 600;
    color: #333;
    letter-spacing: -.01rem;
`;
