import React from 'react';
import styled from 'styled-components';


import { font } from 'constants/style';
import { rem, ifProp } from 'utils/style';

const Root = styled.div`
    padding-bottom: 0.625rem;
    padding-left: 1.5rem;
    margin-top: 0.0625rem;
    margin-left: 0.0625rem;
    border-bottom: 1px solid #e8e8e8;
`;

const Item = styled.a`
    margin-right: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #006699;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
        color: #000;
        cursor: pointer;
    }

    ${ifProp('active')`
        color: #000;
    `}
`;

function Tabs({ data, onClick, active }) {
    const idle = () => {};

    const clickHandler = (value) => () => {
        if (value.title !== active) {
            (onClick || idle)(value);
        }
    };

    return (
        <Root>
            {data.map((value) => (
                <Item
                    key={value.title}
                    active={value.title === active}
                    onClick={clickHandler(value)}
                >
                    {value.title}
                </Item>
            ))}
        </Root>
    );
}

export default Tabs;
