import React from 'react'

import BigNews from './BigNews'
import Now from './Now'
import Today from './Today'
import Noise from './Noise'
import Video from './Video'
import EnterOne from './EnterOne'
import Banner from './Banner'
import RandomNews from './RandomNews'
import Subscribe from './Subscribe'
import MoreNews from './MoreNews'
import BannerPreview from './BannerPreview'
import MoreVideo from './MoreVideo'
import ListVideo from './ListVideo'

import './style.scss'

function HomePage() {

    return (
        <div className="general-news">
            <div className="general-news__container container">
                <div className="general-news__left">
                    <div className="general-news__left-wrapper">
                        <BigNews className="general-news__big-news" />
                        <Now className="general-news__now" />
                    </div>
                    <div className="general-news__left-wrapper two-wrapper">
                        <Today className="general-news__per-day" />
                        <Noise className="general-news__info-noize" />
                    </div>
                </div>
                <div className="general-news__right">
                    <Video className="general-news__general-video" />
                    <EnterOne className="general-news__enter-one" />
                </div>
                <div className="general-news__left general-news__left_more">
                    <div className="general-news__left-wrapper">
                        <Banner className="general-news__banner" />
                    </div>
                    <RandomNews className="general-news__random-news" />
                </div>
                <div className="general-news__right general-news__right_more">
                    <Subscribe className="general-news__subscribe"/>
                    <MoreNews className="general-news__more-news" />
                </div>
                <div className="general-news__middle">
                    <BannerPreview className="general-news__banner-preview" />
                </div>
                <div className="general-news__left general-news__left_more">
                    <MoreVideo className="general-news__more-video" />
                </div>
                <div className="general-news__right general-news__right_more">
                    <ListVideo className="general-news__list-video" />
                </div>
            </div>
        </div>
    )
}

export default HomePage
