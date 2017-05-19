import React from 'react'

import { ensureAbs } from 'shared/utils/uri'

import pic from './1.png'

function Img(props) {
    const src = props.src
        ? ensureAbs(props.src)
        : pic

    return <img {...props} src={src} />
}

export default Img
