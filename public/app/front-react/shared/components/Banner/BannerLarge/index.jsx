import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive'
import how_3c from './img/how_3c.gif'
import how_1c from './img/how_1c.gif'

import './style.scss'

const Banner = ({images, url, className})=> (
    <div className={classNames('banner banner__where-view', className)}>
        <MediaQuery maxWidth="1249px">
            <img src={images ? images.mobile : how_1c} alt="" role="presentation"/>
        </MediaQuery>
        <MediaQuery minWidth="1250px">
            <img src={images ? images.desktop : how_3c} alt="" role="presentation"/>
        </MediaQuery>
    </div>
)

const BannerLarge = ({images, url, className}) => {
    if (url) {
        return (
            <a href={url}>
                <Banner {...{images, url, className}}/>
            </a>
        )
    } else {
        return <Banner {...{images, url, className}}/>
    }

}

export default BannerLarge;
