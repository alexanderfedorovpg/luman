import React from 'react'
import classNames from 'classnames'

import Video from 'components/GeneralVideo'
import Noise from 'components/Noise'
import One from 'components/Broadcast/One'
import Subscribe from 'components/Subscribe'

function Aside({noise, broadcast, className }) {

    return (
        <div className={classNames('right-col', className)}>
            <Video
                data={{}}
                playTitle="date"
                title="Все ключевые события этого дня" />
            <Noise data={noise} />
            <One data={broadcast[1]}/>
            <Subscribe />
        </div>
    )
}

export default Aside