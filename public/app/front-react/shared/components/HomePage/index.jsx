import React from 'react'
import classNames from 'classnames'

import BigNews from './BigNews'
import Now from './Now'
import NowWar from './NowWar'
import Today from './Today'
import Noise from 'components/Noise'
import Block from 'components/Block'
import MiniNews from 'components/MiniNews'
import Video from 'components/GeneralVideo'
import EnterOne from 'components/Broadcast/One'
import Banner from './Banner'
import RandomNews from './RandomNews'
import Subscribe from 'components/Subscribe'
import MoreNews from './MoreNews'
import BannerPreview from './BannerPreview'
import MoreVideo from './MoreVideo'
import ListVideo from './ListVideo'

import './style.scss'

function HomePage({ now, today, other, noise, broadcast, war }) {

    const todayNews = today.slice(0)

    const randomNews = other.slice(0, 7)
    const moreNews = other.slice(7, 13)

    const videoNews = broadcast.map(v => v.record)
    const firstVideo = videoNews[0] || {}

    const moreVideo = videoNews.slice(1, 4)
    const listVideo = videoNews.slice(4, 7)

    return (
        <div className="general-news">
            <div className="general-news__container container">
                <div className="general-news__left">
                    <div className="general-news__left-wrapper">
                        <BigNews className="general-news__big-news" data={now[0]||{}} />
                        {war
                            ? null // <NowWar data={[]} className="general-news__now-war" />
                            : <Now data={now.slice(1, 5)} className="general-news__now" />
                        }
                    </div>
                    <div className="general-news__left-wrapper two-wrapper">
                        <Today
                            data={war ? [firstVideo, ...todayNews] : todayNews}
                            war={war}
                            className={classNames('general-news__per-day', { 'general-news__per-day_war': war })} />
                        {war
                            ? (
                                <div className="info-noize general-news__info-noize general-news__info-noize_war">
                                    <Block
                                        data={todayNews[2]}
                                        war
                                        warTitle={firstVideo.title}
                                        className="info-noize__block-square info-noize__block-square_war" />
                                    <div className="info-noize__wrapper">
                                        {todayNews.slice(3, 7).map(v => (
                                            <MiniNews key={v.id} data={v} className="info-noize__mini-news info-noize__mini-news_war" />
                                        ))}
                                    </div>
                                </div>
                            )
                            : <Noise className="general-news__info-noize" data={noise} />
                        }
                    </div>
                </div>
                <div className="general-news__right right-col">
                    <Video
                        playTitle="date"
                        title="Все ключевые события этого дня"
                        className="general-news__general-video" />
                    {war
                        ? <Noise className="general-news__info-noize" data={noise} />
                        : <EnterOne className="general-news__enter-one" data={firstVideo} />
                    }
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
