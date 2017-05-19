import React from 'react';
import styled, { css } from 'styled-components';

import { font } from 'constants/style';
import { rem, ifProp } from 'utils/style';

export const Root = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

export const itemStyle = css`
    position: relative;

    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: ${rem(19)};

    font-family: ${font.opensans};
    font-size: 16px;
    font-weight: 400;
    color: #666666;

    text-decoration: none;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        color: #000000;

        &:after {
            content: '';

            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;

            height: 3px;

            background-color: #2a2f38;
        }
    }

    ${ifProp('active')`
        color: #000000;
        font-weight: 600;

        &:after {
            content: '';

            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;

            height: 3px;

            background-color: #2a2f38;
        }
    `}
`;

export const Item = styled.a`
    ${itemStyle}
`;

function Tabs({ className, data, onClick, active }) {
    const idle = () => {};

    const clickHandler = (value) => () => {
        if (value.title !== active) {
            (onClick || idle)(value);
        }
    };

    return (
        <Root className={className}>
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
