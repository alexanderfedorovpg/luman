
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
    font-size: 24px;
    color: #333;
    font-weight: 600;
    letter-spacing: -.7px;
    width: 38.7%;
    padding-top: 17px;
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





function ArticlesCategoriesList({}) {
 return ( <ExtTable>
                 <thead>
                 <tr>
                     <ThColName>
                            <UserRow/>
                     </ThColName>
                     <ThColTime>Опубликовано{/*<i class="icon icon-dropdown"></i>*/}</ThColTime>
                     <ThColwrites>Время написания</ThColwrites>
                     <ThColviews>Просмотры</ThColviews>
                     <ThColClicks>Клики</ThColClicks>
                 </tr>
                 </thead>
                 <tbody>
                 <tr>
                     <td>Ожидания и реальность выборов в Америке</td>
                     <td>10:35</td>
                     <td>26 мин</td>
                     <td>6 780</td>
                     <td>7 674</td>
                 </tr>
                 <tr>
                     <td>Почему Трамп победил: секрет</td>
                     <td>16:00</td>
                     <td>44 мин</td>
                     <td>4 539</td>
                     <td>4 539</td>
                 </tr>
                 <tr>
                     <td>Тайны, скандалы, расследования</td>
                     <td>17:10</td>
                     <td>12 мин</td>
                     <td>1 343</td>
                     <td>1 343</td>
                 </tr>
                 <tr>
                     <td>Патриоты, которые запросто могут предать Родину: кто они?</td>
                     <td>22:30</td>
                     <td>1 ч 24 мин</td>
                     <td>789</td>
                     <td>789</td>
                 </tr>
                 <Summary>
                     <td>Всего</td>
                     <td></td>
                     <td></td>
                     <td>13 993</td>
                     <td>25 742</td>
                 </Summary>
                 </tbody>
             </ExtTable>
        )
}



export default ArticlesCategoriesList;
