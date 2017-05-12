
import React, {PropTypes} from 'react';

import styled from 'styled-components'
import Table from '../Table'
import { Link } from 'react-router';
import UserRow from './UserName'


export const Wrap = styled.div`
 padding-left: 1.5rem;
     display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
`

const ExtTable = styled(Table)`
    width: 100%;
    margin-top: 11px;

    th{
        color: #4d4d4d;
        font-weight: 700;
        text-align: left;
        padding-bottom: 4px;
        padding-top: 21px;
    }
    .stats-editor
    .col-clicks,
    .stats-editor
    .col-time,
    .stats-editor
    .col-views,
    .stats-editor
    .col-write {
        padding-top: 21px;
    }

    td:first-child {
        position: relative;
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }
`

const ClassLinkDefault = styled(Link)`
    text-decoration: none;
    letter-spacing: -1.17px;
    background-color: rgba(0, 0, 0, 0);
    color: #369;
    font-weight: 400;
    cursor: pointer;

`
const THead = styled.th`
    padding-bottom: 4px;
`

const ThColName = styled(THead)`

    &:first-child {
        font-size: 24px;
        color: #333;
        font-weight: 600;
        letter-spacing: -.7px;
        width: 38.7%;
        padding-top: 17px;
    }
`
const ThColTime = styled(THead)`
     width: 14.3%;
    padding-left: .25rem;
`
const ThColwrites = styled(THead)`
    width: 28.4%;
    padding-left: .25rem;
`
const ThColviews = styled(THead)`
    width: 10.3%;
`
const ThColClicks = styled(THead)``
const Summary = styled.tr`

td {
    color: #333;
    font-weight: 700;
    font-size: 14px;
    font-weight: 700;
}
`





function ArticlesCategoriesList({data}) {
    if(!data ) return;

    // Itterate over the data to result a rendered list with data included
    const dataSet = data.map((item, i) => {
        if(!item || !item.mews ||!item.mews.avg_time_work) return;

         return   <tr key={i}>
            <td>{item.mews.title}</td>
            <td>10:35</td>
            <td>{item.mews.avg_time_work.hours} часов {item.mews.avg_time_work.minutes} минут</td>
            <td>{item.mews.count_views}</td>
            <td>{item.mews.count_click}</td>
        </tr>


    });

    // Count the sums of each required  col
    const sums = (category) => {
        let val = 0;
        data.forEach((item) => {
            if(!item.mews || !item.mews[category]) return;
            val += parseInt(item.mews[category]);
        });
        return val;
    };

    const getAuthor = () =>{
       return {avatar:((data.length > 0&&data[0].editor)?'//'+data[0].editor.avatar:''),
           name:((data.length > 0&&data[0].editor)?data[0].editor.name:'')}
    }

   return (

    <ExtTable>
                 <thead>
                 <tr>
                     <ThColName>
                         <UserRow author={getAuthor()}/>
                     </ThColName>
                     <ThColTime>Опубликовано{/*<i class="icon icon-dropdown"></i>*/}</ThColTime>
                     <ThColwrites>Время написания</ThColwrites>
                     <ThColviews>Просмотры</ThColviews>
                     <ThColClicks>Клики</ThColClicks>
                 </tr>
                 </thead>
                 <tbody>
                 {dataSet}
                 <Summary>
                     <td>Всего</td>
                     <td></td>
                     <td></td>
                     <td>{sums('count_views')}</td>
                     <td>{sums('count_click')}</td>
                 </Summary>
                 </tbody>
             </ExtTable>
        )
}



export default ArticlesCategoriesList;
