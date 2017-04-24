import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router'
import randomString from 'random-string'

import Rating from 'components/Rating/Item'
import User from 'components/User'
import Status from 'components/Status'
import PushNotification from 'components/PushNotification'
import TitleWrapper from './TitleWrapper'

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

const Rubric = styled.p`
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

const UserWrapper = styled.div`
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
`

const navItemStyles = css`
    display: block;
    margin-bottom: 8px;

    font-family: ${font.helvetica};
    font-size: 14px;
    cursor: pointer;
    font-weight: 400;
    color: #666666;
    text-decoration: none;

    &:hover {
        color: #000;
    }

    &:last-child {
        margin-bottom: 0;
    }
`

const NavItem = styled.a`${navItemStyles}`
const CustomLink = styled(Link)`${navItemStyles}`
const CustomPush = styled(PushNotification)`${navItemStyles}`

function Item({ data, newItem }) {
    let editor = data.editor
        ? data.editor
        : null

    return (
        <Root>
            <Wrapper>
                <Left>
                    <Header>
                        <CustomRating
                            rating={data.top}
                            checked={data.top} />
                        <Rubric>
                            {data.rubrics && data.rubrics.name}
                        </Rubric>
                    </Header>
                    <Title new={newItem}>
                        <TitleWrapper rating={data.top}>
                            {data.title}
                        </TitleWrapper>
                    </Title>
                    <Tags>
                        {data.tags
                            .filter(value => !!value.trim())
                            .map(value => (
                                <span key={value}>
                                    #{value}
                                </span>
                            ))
                        }
                    </Tags>
                </Left>
                <Right>
                    <UserWrapper>
                        {editor
                            ? <User data={editor} />
                            : null
                        }
                    </UserWrapper>
                    <Time is-out={!!data.timeClass}>
                        {data.time_edit
                            ? `${data.time_edit.hh} ч ${data.time_edit.mm} мин`
                            : null
                        }
                    </Time>
                    <Status active={data.is_online} />
                    <Nav className={navClassName}>
                        {editor
                            ? <CustomPush user={editor}>
                                Пуш-уведомление
                            </CustomPush>
                            : null}
                        <CustomLink to={`/editor/${data.id}`}>
                            {editor
                                ? 'Сменить редактора'
                                : 'Назначить редактора'
                            }
                        </CustomLink>
                        {editor
                            ? <NavItem href="#">Снять задание</NavItem>
                            : null
                        }
                    </Nav>
                </Right>
            </Wrapper>
        </Root>
    )
}

export default Item
