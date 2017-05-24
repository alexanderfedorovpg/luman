import React, { PropTypes } from 'react'

import Item from './Item'

function News({ data, toMain, onRemove }) {

    return (
        <div>
            {data.map((value) => (
                <Item
                    key={value.id}
                    toMain={toMain}
                    data={value}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}

News.propTypes = {
    data: PropTypes.array.isRequired,
    toMain: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default News
