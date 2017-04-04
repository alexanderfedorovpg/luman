import React from 'react'
import styled from 'styled-components'

import { Wrap } from '../Content'

import { below } from 'utils/style'
import { padding } from 'constants/style'

export default styled(Wrap)`
    padding-left: ${padding};

    ${below('1100px')`
        display: block;
    `}
`
