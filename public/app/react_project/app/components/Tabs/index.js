import React from 'react'
import styled from 'styled-components'

import { font } from 'constants/style'
import { rem, ifProp } from 'utils/style'

const Root = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

const Item = styled.a`
    position: relative;

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
`

function Tabs() {
    return (
        <Root>
            <Item href="#" active>Сегодня</Item>
            <Item href="#">За неделю</Item>
            <Item href="#">За месяц</Item>
            <Item href="#">Год</Item>
        </Root>
    )
}

export default Tabs
