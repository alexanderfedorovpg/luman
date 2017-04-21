import React from 'react'
import styled from 'styled-components'
import Tooltip from 'react-aria-tooltip'
import randomString from 'random-string'

import Icon from 'components/Icon'

import { font, padding } from 'constants/style'

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

    }

    &:first-child {
        border-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }
`

const Wrapper = styled.div`
    display: block;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding-top: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-top: 12px;
    padding-right: 24px;
    padding-bottom: 12px;
`

const Header = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 30px;
`

const Rating = styled.div`
    position: relative;
    z-index: 5;
    display: block;
    width: 28px;
    height: 28px;
    font-family: "HelveticaNeue", Helvetica, Arial, sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.75rem;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    width: 28px;
    height: 28px;
    margin-bottom: 28px;
        margin-right: 7px;
    margin-bottom: 0;
    background-color: #ff4e00;
`

const ItemIcon = styled(Icon)`
    flex-shrink: 0;
`

const Title = styled.span`
  
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: #333333;
    font-weight: bold;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: -0.15px;
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

const TagName = styled.p`
    margin: 0;
    font-family: "Open Sans", Arial, sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;
`

function Item({ data, toWork, hide, open, style }) {
    console.log(data);
    return (
        <Root onClick={() => open(data.id)} style={style}>
            <Wrapper>
                {/*<ItemIcon type="tass" />*/}
                <Header>
                    <Rating>6</Rating>
                    <TagName>
                        {data.tags}
                    </TagName>
                </Header>
                <Title className={titleClassName}>
                    {data.header}
                </Title>
                <Ignore message="Не для главной" eventType="hover" direction="bottom">
                    <Icon
                        type="delete"
                        onClick={e => {
                            hide(data.id)
                            e.stopPropagation()
                        }} />
                </Ignore>
                <Work message="На главную" eventType="hover" direction="bottom">
                    <Icon
                        type="go-right"
                        onClick={e => {
                            toWork(data.id)
                            e.stopPropagation()
                        }} />
                </Work>
            </Wrapper>
        </Root>
    )
}

Item.PropTypes = {
    data: React.PropTypes.object.isRequired
}

export default Item
