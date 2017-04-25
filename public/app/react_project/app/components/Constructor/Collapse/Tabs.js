import React from 'react';
import styled from 'styled-components';


import { font } from 'constants/style';
import { rem, ifProp } from 'utils/style';

const Root = styled.div`
    margin-left: 0.5625rem;
`;

const Item = styled.a`
    margin-right: 1.3125rem;
    font-size: 14px;
    font-weight: 700;
    color: #ccc;
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
