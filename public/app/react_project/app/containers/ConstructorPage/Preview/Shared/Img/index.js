import React from 'react'

import pic from './1.png'

function Img(props) {
    const src = props.src || pic

    return <img {...props} src={src} />
}

export default Img
