import React from 'react'
import classNames from 'classnames'

import Video from 'components/GeneralVideo'
import Noise from 'components/Noise'
import One from 'components/Broadcast/One'

function Aside({noise, broadcast, className }) {

    return (
        <div className={classNames('right-col', className)}>
            <Video />
            <Noise data={noise} />
            <One data={broadcast[0]}/>
        </div>
    )
}

export default Aside
