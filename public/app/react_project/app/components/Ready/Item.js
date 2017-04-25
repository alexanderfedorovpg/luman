import React from 'react'
import styled from 'styled-components'
import randomString from 'random-string'

import Rating from 'components/Rating/Item'
import TitleWrapper from 'components/Working/TitleWrapper'
import Icon from 'components/Icon'
import Button from 'components/Button'

import { rem, ifProp } from 'utils/style'
import { font, padding } from 'constants/style'

const secretClassName = randomString()

const Root = styled.div`
    position: relative;

    padding-left: ${padding};

    cursor: pointer;

    &:first-child {
        margin-top: ${rem(-5)};
    }
    &:hover {
        background-color: #f3f3f3;

        .${secretClassName} {
            visibility: visible;
            display: block;
        }
    }
`

const Wrapper = styled.div`
    padding-top: 14px;
    padding-right: 24px;
    padding-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #e9e9e9;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    flex-basis: 16.85%;

    border-right: 0;
`

const Time = styled.time`
    font-family: ${font.opensans};
    font-size: 12px;
    font-weight: 400;
    text-align: right;

    color: #666;

    span {
        color: #999;
    }
`

const UserName = styled.div`
    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    font-weight: 400;

    color: #666;
    text-decoration: none;
    margin-top: 5px;

    letter-spacing: 0.1px;
`

const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 2px;
    margin-left: 5px;
`

const Content = styled.div`
    flex-grow: 1;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    height: 30px;
    margin-bottom: 3px;
`

const CustomRating = styled(Rating)`
    margin-right: 7px;
    margin-bottom: 0;
`

const Rubric = styled.div`
    margin: 0;

    font-family: ${font.opensans};
    font-size: 11px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;
`

const Title = styled.div`
    margin-top: 2px;
    margin-bottom: 3px;

    ${ifProp('new')`
        font-weight: 700;
    `}
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

const ButtonContainer = styled.div`
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    flex-basis: 364px;
    width: 364px;
    padding-left: 40px;
    margin-right: 21px;

    visibility: hidden;
`

const CustomButton = styled(Button)`
    border: 0;
    background-color: #fff;
`

const PreviewButton = styled(CustomButton)`
    font-weight: 400;
`

const PublishButton = styled(CustomButton)`
    margin-left: 8px;
`

const CloseIcon = styled(Icon)`
    position: absolute;
    top: 13px;
    right: 12px;

    display: none;
`

function Item() {

    return (
        <Root>
            <Wrapper>
                <Left>
                    <Time>
                        15 января 2017, <span>15:18</span>
                    </Time>
                    <UserName>
                        Ковалев Максим
                    </UserName>
                </Left>
                <Right>
                    <Content>
                        <Header>
                            <CustomRating rating={6} checked={6} />
                            <Rubric>
                                Политика
                            </Rubric>
                        </Header>
                        <Title new={true}>
                            <TitleWrapper rating={6}>
                                Петагон: США готовы сбить ракеты КНДР при наличии угрозы
                            </TitleWrapper>
                        </Title>
                        <Tags>
                            <span>#Внешняя политика</span>
                            <span>#США</span>
                        </Tags>
                    </Content>
                    <ButtonContainer className={secretClassName}>
                        <PreviewButton md primary>Предпросмотр</PreviewButton>
                        <PublishButton md success>
                            <Icon type="arrow-right" />
                            Опубликовать
                        </PublishButton>
                    </ButtonContainer>
                </Right>
                <CloseIcon className={secretClassName} type="delete-bold" />
            </Wrapper>
        </Root>
    )
}

export default Item
