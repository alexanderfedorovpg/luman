import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router'
import randomString from 'random-string'

import Rating from 'components/Rating/Item'
import User from 'components/User'
import Status from 'components/Status'
import Icon from 'components/Icon'
import withPermissions from 'HOC/withPermissions'

import Modal from 'components/Modal'

import PushNotification from 'components/PushNotification'
import { titleWrapper } from './style'

import { padding, font } from 'constants/style'
import { ifProp } from 'utils/style'

const navClassName = 'super-item-secret'

const Root = styled.div`
    padding-left: ${padding};

    position:relative;
    cursor: pointer;

    &:hover {
        background-color: #f3f3f3;

        .${navClassName} {
            display: block;
        }

    }
`

const CloseIcon = styled(Icon)`
    position: absolute;
    top: 13px;
    right: 12px;

    display: none;
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

const TitleWrapper = styled.p`
    ${titleWrapper}
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

function Item({
    data,
    push,
    newItem,
    clearTask,
    postMessage,
    toggle,
    open,
    delegate,
    checkPermissions
}) {
    let editor = data.editor
        ? data.editor
        : null

    return (
        <Root>
            <Wrapper>
                <Left onClick={() => {
                        checkPermissions('news', true, ['getOne', 'edit'])
                        && push(`/editor/${data.id}`)
                    }}>
                    <Header>
                        <CustomRating
                            rating={data.top}
                            checked={data.top} />
                        <Rubric>
                            {(data.rubrics || []).map(v => (
                                v.name
                            )).join(' ')}
                        </Rubric>
                    </Header>
                    <Title new={newItem}>
                        <TitleWrapper rating={data.top}>
                            {data.title}
                        </TitleWrapper>
                    </Title>
                    <Tags>
                        {(data.keywords || [])
                            .filter(value => !!value.trim())
                            .map((value, i) => (
                                <span key={i}>
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
                            : 'Без автора'
                        }
                    </UserWrapper>
                    <Time is-out={!!data.timeClass}>
                        {data.time_edit
                            ? formatTimeHelper(data.time_edit)
                            : null
                        }
                    </Time>
                    <Status active={data.is_online} />
                    {editor
                        ? (
                            <Nav className={navClassName}>
                                <CustomPush
                                    user={editor}
                                    send={postMessage.bind(this, data.id)}>
                                    Пуш-уведомление
                                </CustomPush>
                                {checkPermissions('news', false, ['delegate']) && (
                                    <NavItem onClick={() => delegate.bind(this, data.editor, data.id)()}>
                                        Сменить редактора
                                    </NavItem>
                                )}
                                {checkPermissions('news', false, ['delete']) && (
                                    <NavItem onClick={()=>clearTask(data.id)}>
                                        Удалить задание
                                    </NavItem>
                                )}
                            </Nav>
                        )
                        : checkPermissions('news', false, ['delegate']) && (
                            <Nav className={navClassName}>
                                <NavItem onClick={() => delegate.bind(this, data.editor, data.id)()}>
                                    Назначить редактора
                                </NavItem>
                            </Nav>
                        )
                    }
                </Right>
            </Wrapper>
            {!editor
                ? (
                    <CloseIcon onClick={() => toggle.bind(this, data.id)()} className={navClassName} type="delete-bold"/>
                )
                :
                null
            }
        </Root>
    )
}

export default withPermissions(Item)

function formatTimeHelper(str) {
    let [day, hour, min, sec] = str.split(':')
    const nbsp = '\u00a0'

    if (parseInt(day, 10)) {
        return `${day}${nbsp}д ${hour}${nbsp}ч ${min}${nbsp}мин ${sec}${nbsp}сек`
    }

    if (parseInt(hour, 10)) {
        return `${hour}${nbsp}ч ${min}${nbsp}мин ${sec}${nbsp}сек`
    }

    if (parseInt(min, 10)) {
        return `${min}${nbsp}мин ${sec}${nbsp}сек`
    }

    if (parseInt(sec, 10)) {
        return `${sec}${nbsp}сек`
    }

    return ``
}
