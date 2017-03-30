import React from 'react'
import styled from 'styled-components'

import Item from './Item'

function News({ data }) {
    return (
        <div>
            {data.map(value => {
                return (
                    <Item key={value.id} data={value} />
                )
            })}
        </div>
    )
}

News.PropTypes = {
    data: React.PropTypes.array.isRequired
}

export default News
