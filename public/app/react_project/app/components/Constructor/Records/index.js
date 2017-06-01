import React, { PropTypes } from 'react'
import styled from 'styled-components'

import Item from './Item'

const Wrapper = styled.div`
    padding-top: 25px;
`

function Records({ data, toMain, onRemove }) {

    return (
        <Wrapper>
            {data.map(value => (
                <Item
                    key={value.id}
                    toMain={toMain}
                    data={value}
                    onRemove={onRemove}
                />
            ))}
        </Wrapper>
    )
}

Records.propTypes = {
    data: PropTypes.array.isRequired,
    toMain: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default Records
