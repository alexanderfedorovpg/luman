import React from 'react'
import styled, {css} from 'styled-components'

import Icon from '../Icon'
import User from '../User'
import {Left} from '../Content'
import Table from '../Table'

import {padding} from 'constants/style'
import {below} from 'utils/style'
import {Link} from 'react-router'
import {namesMap} from '../../containers/StatsPage/constants'


const CustomLeft = styled(Left)`
    margin-top: 7px;
    padding-top: 10px;
    flex-grow: 0;

    flex-basis: 50.67%;
    width: 50.67%;
    padding-right: ${padding};

    ${below('1100px')`
        padding-right: 0;
        flex-basis: 100%;
        width: 100%;
        border-right: 0;
    `}
`

const Summary = styled.tr`
    td {
        color: #333333;
        font-weight: 700;
    }
`

const CustomIcon = styled(Icon)`
    margin-right: 11px;
`

const navItemStyles = css(`

`)


function Content({rowClickCallback, data}) {

    // Itterate over the data to result a rendered list with data included
    const dataSet = data.map((item) => {
        return <tr key={item.type} onClick={() => rowClickCallback(item.type)}>
            <td>
                <CustomIcon type={item.type}/>
                {namesMap[item.type]}
            </td>
            <td>{item.count_publish}</td>
            <td>{item.count_views}</td>
            <td>{item.count_click}</td>
        </tr>

    });

    // Count the sums of each required  col
    const sums = (category) => {
        let val = 0;
        data.forEach((item) => {
            val += item[category];
        });
        return val;
    };

    return (
        <CustomLeft>

            <Table>
                <thead>
                <tr>
                    <th style={{width: '33.13%'}}></th>
                    <th style={{width: '25.6%'}}>Опубликовано</th>
                    <th style={{width: '21.1%'}}>Просмотры</th>
                    <th>Клики</th>
                </tr>
                </thead>
                <tbody>

                {dataSet}

                <Summary>
                    <td>
                        <CustomIcon type="summary"/>
                        Всего
                    </td>
                    <td>{sums('count_publish')}</td>
                    <td>{sums('count_views')}</td>
                    <td>{sums('count_click')}</td>
                </Summary>
                </tbody>
            </Table>
        </CustomLeft>
    )
}

export default Content
