import React from 'react'

import Video from './Video'
import Default from './Default'

export default function ({ hasVideo, ...props}) {
    if (!props.data) return null

    return (
        hasVideo
            ? <Video {...props} />
            : <Default {...props} />
    )
}
