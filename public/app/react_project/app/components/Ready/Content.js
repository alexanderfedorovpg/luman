import React from 'react'
import styled from 'styled-components'

import Item from './Item'

const Root = styled.div`
    margin-top: -9px;

    flex-basis: 100%;
`

function Content() {

    return (
        <Root>
            <Item />
        </Root>
    )
}

export default Content
