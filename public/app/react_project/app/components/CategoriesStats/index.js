import React, {PropTypes} from 'react';

import styled from 'styled-components'
import {font} from 'constants/style'
import Helmet from 'react-helmet';
import {Content, Users, Wrap, Header} from '../../components/Stats'
import Dynamic from '../../components/Dynamic'
import moment from 'moment'

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
    text-align: left;
    table-layout: fixed;
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


function CategoriesStats({data}) {

    // Itterate over the data to result a rendered list with data included
    const dataSet = data.map((item, i) => {
        return   <tr key={i}>
            <TdFirst>{item.news_name}</TdFirst>

            <td>{moment(item.publish_date).format("DD.MM.YYYY")}</td>

            <td>
                <User>
                    <UserPicLink>
                        <UserImg
                            src="//{item.avatar_img}"/></UserPicLink>
                    <UserName >
                        {item.editor_name}</UserName>
                </User>
            </td>
            <td>{item.count_views}</td>
            <td>{item.count_click}</td>
        </tr>

    });

    // Count the sums of each required  col
    const sums = (category) => {
        let val = 0;
        data.forEach((item) => {
            val += parseInt(item[category]);
        });
        return val;
    };

    return (
        <TableExt>
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

            {dataSet}

            <Summary>
                <td>Всего</td>
                <td></td>
                <td></td>
                <td>{sums('count_views')}</td>
                <td>{sums('count_click')}</td>
            </Summary>
            </tbody>
        </TableExt>
    )
}


export default CategoriesStats;
