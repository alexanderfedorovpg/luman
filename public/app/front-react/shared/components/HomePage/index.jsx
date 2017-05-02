import React from 'react'

import BigNews from './BigNews'
import Now from './Now'
import Today from './Today'
import Noise from 'components/Noise'
import Video from 'components/GeneralVideo'
import EnterOne from 'components/Broadcast/One'
import Banner from './Banner'
import RandomNews from './RandomNews'
import Subscribe from './Subscribe'
import MoreNews from './MoreNews'
import BannerPreview from './BannerPreview'
import MoreVideo from './MoreVideo'
import ListVideo from './ListVideo'

import './style.scss'

function HomePage({ data, broadcast }) {
    const nowNews = data.news
        .filter(v => v.category.id == 1) // 1 - id категории "сейчас"
        .map(v => v.news)
        .slice(0, 5)

    const todayNews = data.news
        .filter(v => v.category.id == 2) // 2 - id категории "главное за сутки"
        .map(v => v.news)
        .slice(0, 3)

    const otherNews = data.news
        .filter(v => v.category.id == 3) // 3 - id категории "прочее"
        .map(v => v.news)

    const noiseNews = data.noise.map(v => v.news)
    const randomNews = otherNews.slice(0, 7)
    const moreNews = otherNews.slice(7, 13)

    const videoNews = broadcast
        .map(v => v.record)
    const firstVideo = videoNews[0] || {}

    const moreVideo = videoNews.slice(1, 4)
    const listVideo = videoNews.slice(4, 7)

    return (
        <div className="general-news">
            <div className="general-news__container container">
                <div className="general-news__left">
                    <div className="general-news__left-wrapper">
                        <BigNews className="general-news__big-news" data={nowNews[0]||{}} />
                        <Now className="general-news__now" data={nowNews.slice(1)} />
                    </div>
                    <div className="general-news__left-wrapper two-wrapper">
                        <Today className="general-news__per-day" data={todayNews} />
                        <Noise className="general-news__info-noize" data={noiseNews} />
                    </div>
                </div>
                <div className="general-news__right">
                    <Video className="general-news__general-video" />
                    <EnterOne className="general-news__enter-one" data={firstVideo} />
                </div>
                <div className="general-news__left general-news__left_more">
                    <div className="general-news__left-wrapper">
                        <Banner className="general-news__banner" />
                    </div>
                    <RandomNews className="general-news__random-news" data={randomNews} />
                </div>
                <div className="general-news__right general-news__right_more">
                    <Subscribe className="general-news__subscribe"/>
                    <MoreNews className="general-news__more-news" data={moreNews} />
                </div>
                <div className="general-news__middle">
                    <BannerPreview className="general-news__banner-preview" />
                </div>
                <div className="general-news__left general-news__left_more">
                    <MoreVideo className="general-news__more-video" data={moreVideo} />
                </div>
                <div className="general-news__right general-news__right_more">
                    <ListVideo className="general-news__list-video" data={listVideo} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
