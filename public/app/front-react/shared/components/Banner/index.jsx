import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'

import BannerLarge from './BannerLarge';
import BannerPreview from './BannerPreview';
import Subscribe from './Subscribe';

const LARGE = 'large';
const PREVIEW = 'preview';
const SUBSCRIBE = 'subscribe';


let array = [
    {
        type:   'preview', //принимает 1-2-4 колоночные картинки
        url:    '/',
        images: {
            mobile:          '/content/banner/banner-mobile.png',
            tabletLandscape: '/content/banner/banner-tablet-landscape.png',
            desktop:         '/content/banner/banner.png',
        },
        url_to: '/yahoho13'
    },
    {
        type:   'subscribe',//принимает только 1-колоночную картинку
        url:    '/news/8-ssha-vveli-sanktsii-protiv-treh-jivuschih-v-moskve-grajdan-kndr',
        images: {
            mobile:          '/content/subscribe/subscribe.png',
        },
        url_to: '/yahoho12'
    },
    {
        type:   'large', //принимает 1-4 колоночные картинки
        url:    '/',
        images: {
            mobile:          '/content/banner/how_1c.gif',
            desktop:         '/content/banner/how_3c.gif',
        },
        url_to: '/now'
    },
]

const getData = (type, urlNow) => {
    let data = array.filter((item) => (item.url == urlNow && item.type == type))
    if (data.length > 0) {
        return {
            images: data[0].images,
            url_to: data[0].url_to
        };
    } else {
        return {
            images: null,
            url_to: null
        };
    }
}

const Banner = ({type, className,match}) => {
    const data = getData(type, match.url);

    if (type == LARGE) {
        return <BannerLarge images={data.images} url={data.url_to} defaultUrl={'/how'} className={className}/>
    } else if (type == PREVIEW) {
        return <BannerPreview images={data.images} url={data.url_to} defaultUrl={'javascript:void(0)'} className={className}/>
    } else if (type == SUBSCRIBE) {
        return <Subscribe images={data.images} url={data.url_to} defaultUrl={'javascript:void(0)'} className={className}/>
    } else {
        return null;
    }
}


export default withRouter(Banner);
