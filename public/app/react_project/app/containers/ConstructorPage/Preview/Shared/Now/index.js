import React from 'react'
import styled from 'styled-components'

import Mini from '../Mini'
import Group from '../Group'

import { rem } from 'utils/style'
import { color } from 'constants/style'

const Root = styled.div`
    width: ${rem(300)};
    padding-left: ${rem(14)};

    background-color: ${color.grayLight};
    min-height: ${rem(505)};
    padding-top: ${rem(11)};
    overflow: hidden;
`

function Now({ data }) {

    return (
        <Root>
            <Group title="Cейчас">
                {data.map(v => <Mini key={v.id} data={v} compact />)}
            </Group>
        </Root>
    )
}

export default Now
