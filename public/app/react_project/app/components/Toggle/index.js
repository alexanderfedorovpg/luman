import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { ifProp } from 'utils/style'

const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Item = styled.span`
    padding-right: 12px;
    padding-left: 12px;
    margin-right: 4px;

    font-family: $helvetica;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #666;

    border: 1px solid transparent;

    border-radius: 30px;
    cursor: pointer;

    &:hover {
        border-color: #cccccc;
    }

    ${ifProp('active')`
        color: #000;

        background-color: #ffffff;
    `}

    &:last-child {
        margin-right: 0;
    }
`

class Toggle extends PureComponent {

    render() {

        return (
            <Root>
                <Item active>
                    По времени
                </Item>
                <Item>
                    По важности
                </Item>
            </Root>
        )
    }
}

export default Toggle
