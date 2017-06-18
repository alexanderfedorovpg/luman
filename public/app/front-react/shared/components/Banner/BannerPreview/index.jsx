import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive'

import banner from './img/banner.png'
import bannerMobile from './img/banner-mobile.png'
import bannerTabletLandscape from './img/banner-tablet-landscape.png'

import './style.scss'

function BannerPreview({images, url, className, defaultUrl}) {

    return (
    <div className={classNames('banner-preview', className)}>
        <Link to={url || defaultUrl}>
            <MediaQuery maxWidth="614px">
                <img  className="banner-preview__img" src={images ? images.mobile : bannerMobile} alt="" role="presentation"/>
            </MediaQuery>
            <MediaQuery minWidth="615px" maxWidth="1249px">
                <img className="banner-preview__img" src={images ? images.tabletLandscape : bannerTabletLandscape} alt="" role="presentation"/>
            </MediaQuery>
            <MediaQuery minWidth="1250px">
                <img className="banner-preview__img" src={images ? images.desktop : banner} alt="" role="presentation"/>
            </MediaQuery>
        </Link>
    </div>
    )
}


export default BannerPreview
