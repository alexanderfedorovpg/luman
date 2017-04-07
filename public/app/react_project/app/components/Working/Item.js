import React from 'react'
import styled from 'styled-components'
import randomString from 'random-string'

import Rating from 'components/Rating/Item'
import User from 'components/User'
import Status from 'components/Status'

import { padding, font } from 'constants/style'
import { ifProp } from 'utils/style'

const navClassName = randomString()

const Root = styled.div`
    padding-left: ${padding};

    cursor: pointer;

    &:hover {
        background-color: #f3f3f3;

        .${navClassName} {
            display: block;
        }

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
    flex-shrink: 0;
    width: 49.35%;
    padding-top: 0;
    padding-right: 20px;

    border-right: 1px solid #e9e9e9;
`

const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    width: 50.75%;
    padding-top: 0;
    margin-top: -8px;
    margin-left: 20px;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    height: 30px;
`

const CustomRating = styled(Rating)`
    margin-right: 7px;
    margin-bottom: 0;
`

const Title = styled.p`
    margin: 0;

    font-family: ${font.opensans};
    font-size: 11px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;
`

const Cnt = styled.div`
    margin-top: 2px;
    margin-bottom: 3px;

    ${ifProp('new')`
        font-weight: 600;
    `}

    ${ifProp('newest')`
        font-weight: 700;
    `}
`

const P = styled.p`
    margin: 0;

    line-height: 1.35;
    letter-spacing: -0.3px;

    ${props => {
        switch (props.rating) {
            case 1:
            case 2:
            case 3:
            case 4:
                return `
                    font-size: ${13+props.rating}px;
                `

            case 5:
                return `
                    font-size: 18px;
                    letter-spacing: -0.15px;
                `

            case 6:
                return `
                    font-size: 19px;
                    line-height: 24px;
                    letter-spacing: -0.15px;
                `

            case 7:
                return `
                    font-size: 20px;
                    line-height: 27px;
                    letter-spacing: 0.3px;
                `

            case 8:
                return `
                    font-size: 24px;
                    line-height: 29px;
                    letter-spacing: -0.3px;
                `
        }
    }}
`

const Tags = styled.div`
    margin-bottom: -3px;

    font-size: 12px;
    font-weight: 600;
    line-height: 24px;
    color: #999;

    span {
        margin-right: 8px;

        letter-spacing: 0.15px;
    }
`

const CustomUser = styled(User)`
    width: 42.5%;
`

const Time = styled.span`
    width: 15.3%;

    font-family: $opensans;
    font-size: 11px;
    font-weight: 400;
    color: #999999;

    ${ifProp('is-out')`
        color: #aa0111;
    `}
`

const Nav = styled.div`
    display: none;
    margin-left: 6.9%;

    a {
        display: block;
        margin-bottom: 8px;

        font-family: ${font.helvetica};
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        text-decoration: none;

        &:hover {
            color: #000;
        }

        &:last-child {
            margin-bottom: 0;
        }

    }

`

function Item({ data }) {
    return (
        <Root>
            <Wrapper>
                <Left>
                    <Header>
                        <CustomRating
                            rating={+data.rating}
                            checked={+data.rating} />
                        <Title>
                            {data.tag}
                        </Title>
                    </Header>
                    <Cnt
                        newest={helper(data.cntClass, /newest$/)}
                        new={helper(data.cntClass, /new$/)}>
                        <P rating={+data.ratingClass.slice(-1)}>
                            {data.cnt}
                        </P>
                    </Cnt>
                    <Tags>
                        <span>#внешняя политика</span>
                        <span>#США</span>
                    </Tags>
                </Left>
                <Right>
                    <CustomUser data={{ pic: data.userPic, name: data.userName }} />
                    <Time is-put={!!data.timeClass}>
                        {data.time}
                    </Time>
                    <Status active={!!data.statusClass} />
                    <Nav className={navClassName}>
                        <a href="#">Пуш-уведомление</a>
                        <a href="#">Сменить редактора</a>
                        <a href="#">Снять задание</a>
                    </Nav>
                </Right>
            </Wrapper>
        </Root>
    )
}

export default Item

function helper(string, rexp) {
    return (string||'').search(rexp) > -1
}
