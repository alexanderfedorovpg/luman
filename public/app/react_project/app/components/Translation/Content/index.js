import React from 'react'
import { Link } from 'react-router'

import { Wrap, Left } from 'components/Content'

function Content({ data }) {

    return (
        <Wrap>
            <Left>
                {data.map(v => (
                    <div key={v.id}>
                        <Link to={`/translation/${v.id}`}>
                            {v.title}
                        </Link>
                    </div>
                ))}
            </Left>
        </Wrap>
    )
}

export default Content
