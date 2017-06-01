import React, { PropTypes } from 'react'
import styled from 'styled-components'

import Item from './Item'

const Wrapper = styled.div`
    padding-top: 25px;
`

function News({ data, toMain, onRemove, push }) {

    return (
        <Wrapper>
            {data.map((value) => (
                <Item
                    key={value.id}
                    toMain={toMain}
                    data={value}
                    onRemove={onRemove}
                    push={push}
                />
            ))}
        </Wrapper>
    )
}

News.propTypes = {
    data: PropTypes.array.isRequired,
    toMain: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default News
