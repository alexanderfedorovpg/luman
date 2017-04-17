import React from 'react'
import styled from 'styled-components'

import Item from './Item.supervisor'

const Root = styled.div`
    width: 100%;
    margin-top: -15px;
`

function Content({ news, old }) {

    return (
        <Root>
            {news.map(value => (
                <Item
                    key={value.id}
                    data={value}
                    newItem={old.indexOf(value.id) == -1} />
            ))}
        </Root>
    )
}

export default Content
