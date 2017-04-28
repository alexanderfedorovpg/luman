import React, { PropTypes } from 'react'

import Item from './Item'

function News({ data, toMain }) {

    return (
        <div>
            {data.map(value => (
                <Item
                    key={value.id}
                    toMain={toMain}
                    data={value} />
            ))}
        </div>
    )
}

News.propTypes = {
    data: PropTypes.array.isRequired,
    toMain: PropTypes.func.isRequired
}

export default News
