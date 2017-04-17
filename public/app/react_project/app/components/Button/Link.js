import React from 'react'
import styled from 'styled-components'

import { font } from 'constants/style'

const ButtonLink = styled.button`
    border: 0;
    background: none;

    font-family: ${font.opensans};
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;

    color: #666;
`

export default ButtonLink
