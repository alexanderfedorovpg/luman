import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'

import BannerLarge from './BannerLarge';
import BannerPreview from './BannerPreview';
import Subscribe from './Subscribe';
import BannerAppMobile from './BannerAppMobile';

const LARGE = 'large';//принимает 1-3 колоночные картинки
const PREVIEW = 'preview'; //принимает 1-2-4 колоночные картинки
const SUBSCRIBE = 'subscribe';//принимает 1 колоночные картинки
const APP_MOBILE = 'app_mobile';//принимает 1 колоночные картинки


let array = [
    {
        type:  'large',
        url:   '/news',
        multi: true,
    },
    {
        type:  'large',
        url:   '/broadcast',
        multi: true,
    },
    {
        type:   'subscribe',
        url:    '/news/8-ssha-vveli-sanktsii-protiv-treh-jivuschih-v-moskve-grajdan-kndr',
        images: {
            mobile: '/content/banner/reload1.png',
        },
        url_to: '/broadcast/323'
    },
    {
        type:   'preview',
        url:    '/news',
        images: {
            mobile:          '/content/banner/here_and_there_1c.png',
            tabletLandscape: '/content/banner/here_and_there_2c.png',
            desktop:         '/content/banner/here_and_there_4c.png',
        },
        url_to: '/programs/2'
    },
    {
        type:   'preview',
        url:    '/broadcast',
        images: {
            mobile:          '/content/banner/here_and_there_1c.png',
            tabletLandscape: '/content/banner/here_and_there_2c.png',
            desktop:         '/content/banner/here_and_there_4c.png',
        },
        url_to: '/programs/2'
    },
    {
        type:   'large',
        url:    '/',
        images: {
            mobile:  '/content/banner/namedni_1c.jpg',
            tabletLandscape:  '/content/banner/namedni_2c.jpg',
            desktop: '/content/banner/namedni_3c.jpg',
        },
        url_to: '/programs/3'
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

const Banner = ({type, className, match, column}) => {
    const data = getData(type, match.url);
    if (type == LARGE) {
        if(data.multi){
            return <BannerAppMobile column={column || 1} className={className}/>
        }else{
            return <BannerLarge images={data.images} url={data.url_to} className={className}/>
        }
    } else if (type == PREVIEW) {
        return <BannerPreview images={data.images} url={data.url_to || '/programs/2'} className={className}/>
    } else if (type == SUBSCRIBE) {
        return <Subscribe images={data.images} url={data.url_to} defaultUrl={'javascript:void(0)'} className={className}/>
    } else if (type == APP_MOBILE) {
        return <BannerAppMobile column={column || 1} className={className}/>
    } else {
        return null;
    }
}


export default withRouter(Banner);
