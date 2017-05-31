import React from 'react'
import styled from 'styled-components'

import BlockBase from '../Block'

import { rem } from 'utils/style'

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -7px;
    margin-bottom: -7px;
`

const Block = styled(BlockBase)`
    margin-top: ${rem(8)};
    margin-bottom: ${rem(7)};

    height: ${rem(245)};
`

function Random({ data, className }) {
    const primal = data[0]
    const secondary = data.slice(1, 4)
    const rest = data.slice(4)

    if (rest.length) {
        secondary.push({ list: rest })
    }

    return (
        <div className={className}>
            <Row>
                <Block data={primal} rectangle />
                {secondary.map((value, i) => (
                    <Block data={value} key={i} />
                ))}
            </Row>
        </div>
    )
}

export default Random
