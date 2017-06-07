import React from 'react'
import classNames from 'classnames'
import MediaQuery from 'react-responsive'

import Video from './Video'
import Noise from 'components/Noise'
import FromEnter from 'components/Broadcast/One'
import Subscribe from 'components/Subscribe'
import Banner from 'components/HomePage/Banner'

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
            <Subscribe className="news-top__subscribe" />
            <MediaQuery minDeviceWidth="1036px" maxDeviceWidth="1599px">
                <Banner className="news-top__banner" />
            </MediaQuery>
        </div>
    )
}

export default Aside
