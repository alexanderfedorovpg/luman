import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import User from '../User'
import { Left } from '../Content'
import Table from '../Table'

import { padding } from 'constants/style'
import { below } from 'utils/style'

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

function Content() {
    return (
        <CustomLeft>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: '33.13%' }}></th>
                        <th style={{ width: '25.6%' }}>Опубликовано</th>
                        <th style={{ width: '21.1%' }}>Просмотры</th>
                        <th>Клики</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <CustomIcon type="article" />
                            Статьи
                        </td>
                        <td>8</td>
                        <td>6 780</td>
                        <td>4 500</td>
                    </tr>
                    <tr>
                        <td>
                            <CustomIcon type="video" />
                            Видео
                        </td>
                        <td>8</td>
                        <td>6 780</td>
                        <td>4 500</td>
                    </tr>
                    <tr>
                        <td>
                            <CustomIcon type="programms" />
                            Программы
                        </td>
                        <td>8</td>
                        <td>6 780</td>
                        <td>4 500</td>
                    </tr>
                    <tr>
                        <td>
                            <CustomIcon type="facebook" />
                            Facebook
                        </td>
                        <td>8</td>
                        <td>6 780</td>
                        <td>4 500</td>
                    </tr>
                    <tr>
                        <td>
                            <CustomIcon type="twitter" />
                            Twitter
                        </td>
                        <td>8</td>
                        <td>6 780</td>
                        <td>4 500</td>
                    </tr>
                    <Summary>
                        <td>
                            <CustomIcon type="summary" />
                            Всего
                        </td>
                        <td>40</td>
                        <td>6 780</td>
                        <td>4 500</td>
                    </Summary>
                </tbody>
            </Table>
        </CustomLeft>
    )
}

export default Content