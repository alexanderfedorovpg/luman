import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import _rand from 'lodash/random';
import _each from 'lodash/foreach';

import banner from './img/banner.png'
import bannerMobile from './img/banner-mobile.png'
import bannerTabletLandscape from './img/banner-tablet-landscape.png'

import './style.scss'

const Banner = ({images, className}) => (
    <div className={classNames('banner-preview', className)}>
        <MediaQuery maxWidth="614px">
            <img className="banner-preview__img" src={images ? images.mobile : bannerMobile} alt=""
                 role="presentation"/>
        </MediaQuery>
        <MediaQuery minWidth="615px" maxWidth="1249px">
            <img className="banner-preview__img" src={images ? images.tabletLandscape : bannerTabletLandscape} alt=""
                 role="presentation"/>
        </MediaQuery>
        <MediaQuery minWidth="1250px">
            <img className="banner-preview__img" src={images ? images.desktop : banner} alt="" role="presentation"/>
        </MediaQuery>
    </div>
)

function BannerPreview({images, url, className, multi}) {
    if (multi) {
        let index = _rand(0, url.length - 1);
        url = url[index];
        images = {
            mobile:          images.mobile[index],
            tabletLandscape: images.tabletLandscape[index],
            desktop:         images.desktop[index],
        };
    }
    if (url) {
        return (
            <Link to={url}>
                <Banner {...{images, className}}/>
            </Link>
        )
    } else {
        return (
            <Banner {...{images, className}}/>
        )
    }
}


export default BannerPreview
