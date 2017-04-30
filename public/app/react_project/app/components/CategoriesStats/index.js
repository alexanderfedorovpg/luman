import React, {PropTypes} from 'react';

import styled from 'styled-components'
import {font} from 'constants/style'
import Helmet from 'react-helmet';
import {Content, Users, Wrap, Header} from '../../components/Stats'
import Dynamic from '../../components/Dynamic'

import Table from '../Table'


const TdFirst = styled.td`

    position: relative !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #333 !important;

`

const ColName = styled.th`
       width: 38.72%;
`;
const ColTitle = styled.th`    width: 14.3%;`;
const ColEditor = styled.th`   width: 28%;`;
const ColViews = styled.th`    width: 10.6%;`;
const ColClicks = styled.th``;


const User = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
     margin-right: .6875rem;
`
const UserPicLink = styled.a`
    display: block;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-right: .75rem;
    background-color: rgba(0, 0, 0, 0);
    color: #369;
    font-weight: 400;
    cursor: pointer;
`

const UserImg = styled.img`
    max-width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`

const UserName = styled.a`
    font-family: "HelveticaNeue",Helvetica,Arial,sans-serif;
    font-size: .875rem;
    font-weight: 400;
    color: #666;
    text-decoration: none;
    margin-top: 3px;
    letter-spacing: .4px;
`

const TableExt = styled(Table)`
    width: 100%;
    margin-top: 24px;
    text-align: left;
    table-layout: fixed;
    tr:hover a{
       font-weight: bold;
    }
`

const Summary = styled.tr`
    td {
        color: rgb(51, 51, 51);
        font-weight: 700;
    }
`


function CategoriesList({}) {
    return (
        <TableExt class="table stats-article">
            <thead>
            <tr>
                <ColName>Статьи</ColName>
                <ColTitle>Опубликовано</ColTitle>
                <ColEditor>Редактор</ColEditor>
                <ColViews>Просмотры</ColViews>
                <ColClicks>Клики</ColClicks>
            </tr>
            </thead>
            <tbody>
            <tr>
                <TdFirst>Ожидания и реальность выборов в Америке</TdFirst>
                <td>10:35</td>
                <td>
                    <User>
                        <UserPicLink>
                            <UserImg
                                src="http://markup.librorum.rtvi.ddemo.ru/app/html_markup/build/static/img/content/user2.png"/></UserPicLink>
                        <UserName >
                            Поликарпов Анатолий</UserName>
                    </User>
                </td>
                <td>6 780</td>
                <td>7 674</td>
            </tr>
            <Summary>
                <td>Всего</td>
                <td></td>
                <td></td>
                <td>13 993</td>
                <td>25 742</td>
            </Summary>
            </tbody>
        </TableExt>
    )
}


export default CategoriesList;
