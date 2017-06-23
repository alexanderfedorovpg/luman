import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import _rand from 'lodash/random';

import colum_1_img from './img/300/mobile.png'
import colum_1_img_btn_app_store from './img/300/btn_app_store.png'
import colum_1_img_btn_google_play from './img/300/btn_google_play.png'

import colum_2_img from './img/616/mobile.png'
import colum_2_img_btn_app_store from './img/616/btn_app_store.png'
import colum_2_img_btn_google_play from './img/616/btn_google_play.png'

import colum_3_img from './img/932/mobile.png'
import colum_3_img_btn_app_store from './img/932/btn_app_store.png'
import colum_3_img_btn_google_play from './img/932/btn_google_play.png'


import './style.scss'

const urlToGooglePlay = 'https://play.google.com/store/apps/details?id=com.rtvi.mobile';
const urlToAppStore = 'https://itunes.apple.com/ph/app/rtvi/id1222310129?mt=8';
/*
*             <MediaQuery minWidth="615px" maxWidth="1249px">
 <img className="banner-app-mobile__img" src={colum_2_img}/>
 <div className="banner-app-mobile__btn-block min_width_1249">
 <a className="banner-app-mobile__btn-app_store" target="_blank" href={urlToAppStore}><img src={colum_2_img_btn_app_store}/></a>
 <a className="banner-app-mobile__btn-google_play" target="_blank" href={urlToGooglePlay}><img src={colum_2_img_btn_google_play}/></a>
 </div>
 </MediaQuery>*/
function BannerAppMobile({className}) {
    return (
        <div className={classNames('banner-app-mobile', className)}>
            <MediaQuery maxWidth="1249px">
                <img className="banner-app-mobile__img" src={colum_1_img}/>
                <div className="banner-app-mobile__btn-block colum_1">
                    <a className="banner-app-mobile__btn-app_store" target="_blank" href={urlToAppStore}><img src={colum_1_img_btn_app_store}/></a>
                    <a className="banner-app-mobile__btn-google_play" target="_blank" href={urlToGooglePlay}><img src={colum_1_img_btn_google_play}/></a>
                </div>
            </MediaQuery>
            <MediaQuery minWidth="1250px">
                <img className="banner-app-mobile__img" src={colum_3_img}/>
                <div className="banner-app-mobile__btn-block colum_3">
                    <a className="banner-app-mobile__btn-app_store" target="_blank" href={urlToAppStore}><img src={colum_3_img_btn_app_store}/></a>
                    <a className="banner-app-mobile__btn-google_play" target="_blank" href={urlToGooglePlay}><img src={colum_3_img_btn_google_play}/></a>
                </div>
            </MediaQuery>
        </div>
    )
}


export default BannerAppMobile
