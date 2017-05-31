import React from 'react'
import styled from 'styled-components'

import GroupBase from '../Group'
import Mini from './Mini'

import { rem } from 'utils/style'

const Group = styled(GroupBase)`
    width: ${rem(300)};
    padding-left: ${rem(14)};
`

function Noise({ data }) {

    return (
        <Group title="Инфошум">
            {data.slice(0, 5).map(v => <Mini key={v.id} data={v} />)}
        </Group>
    )
}

export default Noise
