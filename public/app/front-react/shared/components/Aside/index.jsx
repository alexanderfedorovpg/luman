import React from 'react'
import classNames from 'classnames'

import Video from './Video'
import Noise from 'components/Noise'
import FromEnter from 'components/Broadcast/One'
import Subscribe from 'components/Subscribe'

import efirPlaceholder from './efir.jpg'

function Aside({ noise, broadcast, className }) {
    const first = broadcast[0] || {}
    const rest = broadcast.slice(1)

    return (
        <div className={classNames('right-col', className)}>
            <Video data={first} />
            <Noise data={noise} />
            {rest.length
                ? <FromEnter data={rest}/>
                : <img src={efirPlaceholder} className="from-enter enter-one" />
            }
            <Subscribe />
        </div>
    )
}

export default Aside
