import React from 'react'
import styled, { css } from 'styled-components'
import { FormattedTime, FormattedRelative } from 'react-intl'

import randomString from 'random-string'

import Rating from 'components/Rating/Item'
import Button from 'components/Button'
import Icon from 'components/Icon'
import { titleWrapper } from './style'

import { font } from 'constants/style'
import { ifProp } from 'utils/style'

const secretClassName = 'editor-item-secret'

const Root = styled.div`
    position: relative;

    display: flex;

    box-sizing: border-box;
    justify-content: flex-start;
    padding-top: 1.8rem;
    padding-bottom: 2.6rem;

    border-bottom: 1px solid #e9e9e9;
    cursor: default;

    &:hover {
        border-bottom-color: transparent;
        background-color: #f3f3f3;

        .${secretClassName} {
            display: block;
        }
    }

    &:first-child {
        padding-top: .8rem;
        padding-bottom: 1.9rem;
    }
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 20px;
    padding-bottom: 15px;

    border-bottom: 1px solid #e9e9e9;
`

const Left = styled.div`
    width: 10.5%;
    padding-right: .4rem;

    text-align: right;
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 20px;
`

const Time = styled.p`
    margin-top: .3rem;
    margin-right: 0.1rem;

    font-size: .7rem;
    font-weight: 600;
    color: #666;
    letter-spacing: .01rem;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    height: 30px;
`

const CustomRating = styled(Rating)`
    margin-right: .4rem;
    margin-bottom: 0;
`

const Category = styled.p`
    margin: 0;

    font-family: ${font.opensans};
    font-size: 11px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;
`

const Title = styled.div`
    width: 70%;
    margin-top: 1px;
    margin-bottom: 3px;
    margin-left: -2px;

    ${ifProp('new')`
        font-weight: 700;
    `}
`

const TitleWrapper = styled.p`
    ${titleWrapper}
`

const Tags = styled.div`
    min-height: 0.5rem;
    margin-left: .1rem;

    font-size: 11.5px;
    font-weight: 600;
    line-height: 2.2;
    color: #999;

    span {
        margin-right: 8px;

        letter-spacing: .02rem;
    }
`

const Text = styled.p`
    width: 67%;
    margin-top: 1.3rem;

    font-size: .88rem;

    line-height: 1.5;
`

const Comment = styled.div`
    margin-top: .6rem;
`

const CommentName = styled.div`
    display: inline-block;

    font-size: .88rem;

    font-weight: 700;
    color: #000;
`

const CommentText = styled.div`
    display: inline-block;
    margin-left: .1rem;

    font-size: .88rem;
    color: #333;
`

const ButtonContainer = styled.div`
    position: absolute;
    top: 4rem;
    right: 2.9rem;

    display: none;
`

const CustomButton = styled(Button)`
    border: none;
    background-color: #fff;
    width: 9.9rem;
`

const CloseContainer = styled.div`
    position: absolute;
    top: .8rem;
    right: 1.2rem;

    display: none;

    text-align: right;

    cursor: pointer;
`

function Item({ data, newItem, reject, accept }) {

    return (
        <Root>
            <Left>
                <Time>
                    {data.created_at
                        ? <FormattedRelative value={data.created_at} />
                        : null
                    }
                </Time>
            </Left>
            <Right>
                <Header>
                    <CustomRating rating={data.top} checked={data.top} />
                    <Category>
                        {(data.rubrics || []).map(v => (
                            v.name
                        )).join(' ')}
                    </Category>
                </Header>
                <Title new={newItem}>
                    <TitleWrapper rating={data.top}>
                        {data.title}
                    </TitleWrapper>
                </Title>
                {data.text
                    ? <Text />
                    : null
                }
                {data.lostComment
                    ? (
                        <Comment>
                            <CommentName>
                                {data.lostComment.name}
                            </CommentName>
                            <CommentText>
                                {data.lostComment.description}
                            </CommentText>
                        </Comment>
                    )
                    : null
                }
                <Tags>
                    {(data.keywords || [])
                        .filter(value => !!value.trim())
                        .map((tag, i) => (
                            <span key={i}>
                                #{tag}
                            </span>
                        ))
                    }
                </Tags>
                <ButtonContainer className={secretClassName}>
                    <CustomButton
                        md danger
                        onClick={()=>reject(data.id)}>

                        Отказаться
                    </CustomButton>
                    <CustomButton
                        md success
                        onClick={()=>accept(data.id)}>

                        <Icon type="arrow-right" />
                        В работу
                    </CustomButton>
                </ButtonContainer>
                <CloseContainer className={secretClassName}>
                    <Icon type="delete-reverse" />
                </CloseContainer>
            </Right>
        </Root>
    )
}

export default Item
