import React from 'react'
import styled from 'styled-components'
import randomString from 'random-string'

import Icon from '../Icon'
import User, { Name as UserName } from '../User'
import { Right } from '../Content'
import Table from '../Table'

import { padding } from 'constants/style'
import { below } from 'utils/style'
import moment from "moment"

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


function Users({rowClickCallback, data}) {

    // Itterate over the data to result a rendered list with data included
    const dataSet = data.map((item) => {
        if(!item || !item.avg_time_work) return;
        return <tr key={item.editor_id} onClick={()=>rowClickCallback(item.editor_id)}>
            <td >
                <User data={{ avatar_url: item.avatar_img }}>
                    <UserName className={userClassName}>
                        {item.editor_name}
                    </UserName>
                </User>
            </td>
            <td>{item.count?item.count:'—'}</td>
            <td>{item.avg_time_work.hours} ч. {item.avg_time_work.minutes} мин.</td>
        </tr>

    });

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

                {dataSet}
                </tbody>

            </Table>
        </CustomRight>
    )
}

export default Users
