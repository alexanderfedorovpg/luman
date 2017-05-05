import React from 'react'

import Video from './Video'
import Default from './Default'

export default function (props) {
    if (!props.data) return null

    return (
        props.data.video_stream
            ? <Video {...props} />
            : <Default {...props} />
    )
}
