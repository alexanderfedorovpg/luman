import React from 'react'
import styled from 'styled-components'

import { rem, ifProp } from './../../utils/style'
import { font } from './../../constants/style'

const dangerStyle = `
    font-size: ${rem(9)};

    background-color: #cb0813;
`

export default styled.div`
    width: 17px;
    height: 17px;

    font-family: ${font.helvetica};
    font-size: ${rem(12)};
    font-weight: 700;
    line-height: ${rem(19)};
    text-align: center;
    color: #fff;

    border-radius: 50%;

    ${ifProp('success')`
        background-color: #359918;
    `}

    ${ifProp('danger')(dangerStyle)}
`
