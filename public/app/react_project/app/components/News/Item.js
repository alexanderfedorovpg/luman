import React from 'react'
import styled from 'styled-components'
import Tooltip from 'react-aria-tooltip'
import randomString from 'random-string'

import Icon from './../Icon'

import { font, padding } from './../../constants/style'

const titleClassName = randomString()

const Root = styled.a`
    position: relative;

    display: block;
    padding-right: ${padding};
    padding-left: ${padding};
    margin-bottom: -1px;

    cursor: pointer;

    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
        background-color: #f0f0f0;

        .ra-tooltip-wrapper {
            display: block;
        }

        .${titleClassName} {
            font-weight: 600;
        }

    }

    &:first-child {
        border-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }
`

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 18px 0 17px;
`

const ItemIcon = styled(Icon)`
    flex-shrink: 0;
`

const Title = styled.span`
    margin: 0 0 0 6px;

    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: #333333;
`

const Work = styled(Tooltip)`
    position: absolute;
    top: 50%;
    right: -11px;
    z-index: 2;

    display: none;

    cursor: pointer;
    transform: translateY(-50%);

    .ra-tooltip {
        z-index: 5;
        padding: 4px 9px;
        color: #666;
        font-family: ${font.opensans};
        font-size: 11px;
        font-weight: 400;
        box-shadow: 1px 1px 5px rgba(0,0,0,.28);
        background-color: #fff;
    }
    .ra-tooltip-message:after {
        display: none
    }

    p {
        color: inherit;
        padding: 0;
    }
`

const Ignore = styled(Work)`
    right: 24px;
`

function Item({ data }) {
    return (
        <Root>
            <Wrapper>
                <ItemIcon type="tass" />
                <Title className={titleClassName}>
                    {data.title}
                </Title>
                <Ignore message="Игнорировать" eventType="hover" direction="bottom">
                    <Icon type="delete" />
                </Ignore>
                <Work message="Работаем!" eventType="hover" direction="bottom">
                    <Icon type="do-right" />
                </Work>
            </Wrapper>
        </Root>
    )
}

Item.PropTypes = {
    data: React.PropTypes.object.isRequired
}

export default Item
