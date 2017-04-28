import React, { PropTypes } from 'react'

import Item from './Item'

function Records({ data, toMain }) {

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

Records.propTypes = {
    data: PropTypes.array.isRequired,
    toMain: PropTypes.func.isRequired
}

export default Records
