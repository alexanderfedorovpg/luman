import React from 'react'
import styled from 'styled-components'

import tableOpacity from './img/table-opacity.png'

import { font } from 'constants/style'

const Table = styled.table`
    width: 100%;
    text-align: left;
    table-layout: fixed;
    white-space: nowrap;

    thead {
        border-bottom: 2px solid #d2d2d2;
    }

    th {
        padding-bottom: 8px;

        color: #4d4d4d;
        font-family: ${font.opensans};
        font-size: 14px;
        font-weight: 700;
        text-align: left;

        &:first-child {
            font-size: 24px;
            color: #333;
            font-weight: 600;
            letter-spacing: -0.7px;
        }
    }

    td {
        position: relative;
        white-space: nowrap;
        overflow: hidden;

        height: 51px;
        padding: 0 0 0 2px;

        font-family: ${font.opensans};
        font-size: 14px;
        color: #666666;
        font-weight: 400;

        vertical-align: middle;

        &:after {
            content: ' ';

            position: absolute;
            right: 0;
            top: 1px;
            bottom: 1px;
            width: 50px;
            height: 48px;

            background-image: url(${tableOpacity});
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

    tbody {

        tr {
            border-bottom: 1px solid #e9e9e9;

            &:last-child {
                border-bottom: 0;
            }

            &:hover {
                background-color: #f0f0f0;
                cursor: pointer;

                td {

                    &:after {
                        display: none;
                    }
                }
            }
        }
    }
`

export default Table
