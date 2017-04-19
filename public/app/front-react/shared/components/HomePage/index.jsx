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

function HomePage({ news, videoNews }) {
    const lastNews = news.filter(isNow)
    const oldNews = news.filter(notNow)

    const nowNews = lastNews.sort(latestDate).slice(0, 5)
    const todayNews = lastNews.sort(highestRating).slice(0, 3)
    const noiseNews = lastNews.sort(lowestRating).slice(0, 5)

    const videoByDate = videoNews.sort(latestDate)
    const latestVideo = videoByDate[0] || {}
    const moreVideo = videoByDate.slice(1, 4)
    const listVideo = videoByDate.slice(4, 7)

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
                    <EnterOne className="general-news__enter-one" data={latestVideo} />
                </div>
                <div className="general-news__left general-news__left_more">
                    <div className="general-news__left-wrapper">
                        <Banner className="general-news__banner" />
                    </div>
                    <RandomNews className="general-news__random-news" />
                </div>
                <div className="general-news__right general-news__right_more">
                    <Subscribe className="general-news__subscribe"/>
                    <MoreNews className="general-news__more-news" data={oldNews.slice(0, 6)} />
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

const millisecondsInDay = 24*60*60*1000

const latestDate = (a, b) => Date.parse(b.PublishDate) - Date.parse(a.PublishDate)
const highestRating = (a, b) => b.Top - a.Top
const lowestRating = (a, b) =>a.Top - b.Top

const isNow = value => {
    if (!value) return false

    const date = Date.parse(value.PublishDate)

    if (!date) return false

    if (Date.now() - date < millisecondsInDay) return true
}

const notNow = value => !isNow(value)

export default HomePage
