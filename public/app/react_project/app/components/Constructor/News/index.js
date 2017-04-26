import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Item from './Item'

function News({ data }) {

    return (
        <div>
            {data.map(value => (
                <Item
                    key={value.id}
                    data={value}/>
            ))}
        </div>
    )
}

News.propTypes = {
    data: React.PropTypes.array.isRequired
}

// @DragDropContext(HTML5Backend)
export default News
