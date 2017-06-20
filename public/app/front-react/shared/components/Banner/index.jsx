import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'

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
        multi:  true,
        images: {
            mobile:          ['/content/banner/Android_1c.png', '/content/banner/iPhone_1c.png'],
            tabletLandscape: ['/content/banner/Android_2c.png', '/content/banner/iPhone_2c.png'],
            desktop:         ['/content/banner/Android_3c.png', '/content/banner/iPhone_3c.png'],
        },
        url_to: ['https://play.google.com/store/apps/details?id=com.rtvi.mobile', 'https://itunes.apple.com/ph/app/rtvi/id1222310129?mt=8']
    },
    {
        type:   'subscribe',//принимает только 1-колоночную картинку
        url:    '/news/8-ssha-vveli-sanktsii-protiv-treh-jivuschih-v-moskve-grajdan-kndr',
        images: {
            mobile: '/content/banner/reload1.png',
        },
        url_to: '/broadcast/323'
    },
    {
        type:   'preview', //принимает 1-3 колоночные картинки
        url:    '/news',
        images: {
            mobile:          '/content/banner/here_and_there_1c.png',
            tabletLandscape: '/content/banner/here_and_there_2c.png',
            desktop:         '/content/banner/here_and_there_3c.png',
        },
        url_to: 'https://www.rtvi.com/broadcast/385'
    },
    {
        type:   'preview', //принимает 1-3 колоночные картинки
        url:    '/broadcast',
        images: {
            mobile:          '/content/banner/here_and_there_1c.png',
            tabletLandscape: '/content/banner/here_and_there_2c.png',
            desktop:         '/content/banner/here_and_there_3c.png',
        },
        url_to: 'https://www.rtvi.com/broadcast/385'
    },
    {
        type:   'large', //принимает 1-3 колоночные картинки
        url:    '/',
        images: {
            mobile:  '/content/banner/here_and_there_1c.png',
            desktop: '/content/banner/here_and_there_3c.png',
        },
        url_to: 'https://www.rtvi.com/broadcast/385'
    },
]

const getData = (type, urlNow) => {
    let data = array.filter((item) => (item.url == urlNow && item.type == type))
    if (data.length > 0) {
        return {
            images: data[0].images,
            url_to: data[0].url_to,
            multi:  data[0].multi
        };
    } else {
        return {
            images: null,
            url_to: null,
        };
    }
}

const Banner = ({type, className, match}) => {
    const data = getData(type, match.url);

    if (type == LARGE) {
        return <BannerLarge images={data.images} url={data.url_to} className={className}/>
    } else if (type == PREVIEW) {
        return <BannerPreview multi={data.multi} images={data.images} url={data.url_to} className={className}/>
    } else if (type == SUBSCRIBE) {
        return <Subscribe images={data.images} url={data.url_to} defaultUrl={'javascript:void(0)'} className={className}/>
    } else {
        return null;
    }
}


export default withRouter(Banner);
