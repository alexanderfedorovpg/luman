import React from 'react'
import styled from 'styled-components'

import * as Content from 'components/Content'

export const Wrap = styled(Content.Wrap)``

export const Left = styled(Content.Left) `
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 41.8%;
    width: 41.8%;
`

// export const RightTabs = styled(Tabs)`
//     margin-left: 0.5625rem;
//     padding: 0px;
//     border-bottom: transparent;
// `

export const Right = styled(Content.Right)`
    width: 41.584%;
    flex-basis: 41.584%;
    margin-top: -11px;
    padding-left: 1.5rem;
    flex-grow: 1;
    padding-left: 1.1875rem;
`
