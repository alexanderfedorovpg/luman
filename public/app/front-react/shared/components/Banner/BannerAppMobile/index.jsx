import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';

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


function BannerAppMobile({className, column}) {

    const urlToGooglePlay = 'https://play.google.com/store/apps/details?id=com.rtvi.mobile';
    const urlToAppStore = 'https://itunes.apple.com/ph/app/rtvi/id1222310129?mt=8';
    const data = {
        1: {
            mainImg:       colum_1_img,
            className:     'colum_1',
            btnAppStore:   colum_1_img_btn_app_store,
            btnGooglePlay: colum_1_img_btn_google_play,
        },
        2: {
            mainImg:       colum_2_img,
            className:     'colum_2',
            btnAppStore:   colum_2_img_btn_app_store,
            btnGooglePlay: colum_2_img_btn_google_play,
        },
        3: {
            mainImg:       colum_3_img,
            className:     'colum_3',
            btnAppStore:   colum_3_img_btn_app_store,
            btnGooglePlay: colum_3_img_btn_google_play,
        },
    }
    /*
    *             <MediaQuery maxWidth="1249px">

     </MediaQuery>
     <MediaQuery minWidth="615px" maxWidth="1249px">
     <img className="banner-app-mobile__img" src={colum_2_img}/>
     <div className="banner-app-mobile__btn-block min_width_1249">
     <a className="banner-app-mobile__btn-app_store" target="_blank" href={urlToAppStore}><img src={colum_2_img_btn_app_store}/></a>
     <a className="banner-app-mobile__btn-google_play" target="_blank" href={urlToGooglePlay}><img src={colum_2_img_btn_google_play}/></a>
     </div>
     </MediaQuery>
     <MediaQuery minWidth="1250px">
     <img className="banner-app-mobile__img" src={colum_3_img}/>
     <div className="banner-app-mobile__btn-block colum_3">
     <a className="banner-app-mobile__btn-app_store" target="_blank" href={urlToAppStore}><img src={colum_3_img_btn_app_store}/></a>
     <a className="banner-app-mobile__btn-google_play" target="_blank" href={urlToGooglePlay}><img src={colum_3_img_btn_google_play}/></a>
     </div>
     </MediaQuery>*/
    return (
        <div className={classNames('banner-app-mobile', className)}>
            <img className="banner-app-mobile__img" src={data[column].mainImg}/>
            <div className={classNames('banner-app-mobile__btn-block', data[column].className)}>
                <a className="banner-app-mobile__btn-app_store" target="_blank" href={urlToAppStore}><img src={data[column].btnAppStore}/></a>
                <a className="banner-app-mobile__btn-google_play" target="_blank" href={urlToGooglePlay}><img src={data[column].btnGooglePlay}/></a>
            </div>
        </div>
    )
}


export default BannerAppMobile
