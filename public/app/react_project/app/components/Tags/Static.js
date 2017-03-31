import React from 'react'
import styled from 'styled-components'

import { rem } from '../../utils/style'
import { font, color } from '../../constants/style'

const Root = styled.div`
    display: flex;
    align-items: center;
`

const Item = styled.span`
    position: relative;

    padding-right: 8px;
    margin-right: 5px;

    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    color: ${color.primary};

    &:after {

        content: ' ';

        position: absolute;
        top: 50%;
        right: 0;

        display: block;
        width: 4px;
        height: 4px;

        border-radius: 50%;

        background-color: #9a9a9a;
        transform: translateY(-50%);

    }

    &:last-child {
        margin-right: 0;

        &:after {
            display: none;
        }
    }

`

function Tags({ data }) {
    return (
        <Root>
            {data.map(value => {
                return (
                    <Item key={value}>{value}</Item>
                )
            })}
        </Root>
    )
}

Tags.PropTypes = {
    data: React.PropTypes.array.isRequired
}

export default Tags


//     &__item {
//         position: relative;

//         padding-right: 8px;
//         margin-right: 5px;

//         font-family: $opensans;
//         font-size: 14px;
//         font-weight: 400;
//         color: $cl-primary;

//         &:after {

//             content: ' ';

//             position: absolute;
//             top: 50%;
//             right: 0;

//             display: block;
//             width: 4px;
//             height: 4px;

//             border-radius: 50%;

//             background-color: #9a9a9a;
//             transform: translateY(-50%);

//         }

//         &:last-child {
//             margin-right: 0;

//             &:after {
//                 display: none;
//             }
//         }

//     }
