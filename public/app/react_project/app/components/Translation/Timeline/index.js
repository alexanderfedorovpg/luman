import React from 'react'
import styled from 'styled-components'

import { color } from 'constants/style'
import { rem } from 'utils/style'

const Root = styled.div`
    border: 1px solid rgba(204, 204, 204, 0.74);

    min-height: 20px;
    margin-top: ${rem(27)};
`

const Item = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    padding-top: ${rem(14)};
    padding-right: ${rem(39)};
    padding-bottom: ${rem(14)};
    padding-left: ${rem(21)};
    margin-bottom: ${rem(-10)};
    color: ${color.enter};
    cursor: pointer;
`

function Timeline({ data }) {

    return (
        <Root>
            {[].map(v => (
                <Item key={v.id}>
                </Item>
            ))}
        </Root>
    )
}

export default Timeline
