import React from 'react'
import styled from 'styled-components'
import randomString from 'random-string'

import Icon from '../Icon'
import User, { Name as UserName } from '../User'
import { Right } from '../Content'
import Table from '../Table'

import { padding } from 'constants/style'
import { below } from 'utils/style'

const userClassName = randomString()

const CustomRight = styled(Right)`
    margin-top: 7px;
    padding-top: 10px;
    flex-grow: 0;

    width: 47.884%;
    flex-basis: 47.884%;

    ${below('1100px')`
        flex-basis: 100%;
        width: 100%;
        margin-top: 60px;
        padding-left: 0;
    `}
`

const Tr = styled.tr`
    &:hover {

        .${userClassName} {
            font-weight: 600 !important;
            color: #333 !important;
        }
    }

`

function Users({rowClickCallback}) {
    return (
        <CustomRight>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: '54.65%'}}></th>
                        <th style={{ width: '23%'}}>Материалы</th>
                        <th>Среднее время</th>
                    </tr>
                </thead>
                <tbody>
                    <Tr onClick={()=>rowClickCallback(1)}>
                        <td>
                            <User data={{ pic: '/img/user1.png' }}>
                                <UserName className={userClassName}>
                                    Ковалев Максим
                                </UserName>
                            </User>
                        </td>
                        <td>4</td>
                        <td>12 мин</td>
                    </Tr>
                    <Tr onClick={()=>rowClickCallback(2)}>
                        <td>
                            <User data={{ pic: '/img/user2.png' }}>
                                <UserName className={userClassName}>
                                    Короленко Анастасия
                                </UserName>
                            </User>
                        </td>
                        <td>5</td>
                        <td>17 мин</td>
                    </Tr>
                    <Tr onClick={()=>rowClickCallback(3)}>
                        <td>
                            <User data={{ pic: '/img/user3.png' }}>
                                <UserName className={userClassName}>
                                    Поликарпов Анатолий
                                </UserName>
                            </User>
                        </td>
                        <td>22</td>
                        <td>16 мин</td>
                    </Tr>
                    <Tr onClick={()=>rowClickCallback(4)}>
                        <td>
                            <User data={{ pic: '/img/user4.png' }}>
                                <UserName className={userClassName}>
                                    Марышева Елена
                                </UserName>
                            </User>
                        </td>
                        <td>56</td>
                        <td>15 мин</td>
                    </Tr>
                    <Tr onClick={()=>rowClickCallback(5)}>
                        <td>
                            <User data={{ pic: '/img/user5.png' }}>
                                <UserName className={userClassName}>
                                    Санченков Роман
                                </UserName>
                            </User>
                        </td>
                        <td>3</td>
                        <td>1ч 10 мин</td>
                    </Tr>
                </tbody>
            </Table>
        </CustomRight>
    )
}

export default Users
