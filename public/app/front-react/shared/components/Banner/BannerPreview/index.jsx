import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import _rand from 'lodash/random';

import banner from './img/banner.png'
import colum_1 from './img/here_and_there_1c.png'
import colum_2 from './img/here_and_there_2c.png'
import colum_4 from './img/here_and_there_4c.png'
import bannerTabletLandscape from './img/banner-tablet-landscape.png'

import './style.scss'

const Banner = ({images, className}) => (
    <div className={classNames('banner-preview', className)}>
        <MediaQuery maxWidth="614px">
            <img className="banner-preview__img" src={images ? images.mobile : colum_1} alt=""
                 role="presentation"/>
        </MediaQuery>
        <MediaQuery minWidth="615px" maxWidth="1249px">
            <img className="banner-preview__img" src={images ? images.tabletLandscape : colum_2} alt=""
                 role="presentation"/>
        </MediaQuery>
        <MediaQuery minWidth="1250px">
            <img className="banner-preview__img" src={images ? images.desktop : colum_4} alt="" role="presentation"/>
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
            <a href={url}>
                <Banner {...{images, className}}/>
            </a>
        )
    } else {
        return (
            <Banner {...{images, className}}/>
        )
    }
}


export default BannerPreview
