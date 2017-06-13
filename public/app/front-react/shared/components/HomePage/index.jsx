import React from 'react'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'

import BigNews from './BigNews'
import Now from './Now'
import NowWar from './NowWar'
import Today from './Today'
import Noise from 'components/Noise'
import Group from 'components/Group'
import Block from 'components/Block'
import MiniNews from 'components/MiniNews'
import Video from 'components/Aside/Video'
import AsideVideo from './AsideVideo'
import EnterOne from 'components/Broadcast/One'
import Banner from './Banner'
import RandomNews from './RandomNews'
import Subscribe from 'components/Subscribe'
import MoreNews from './MoreNews'
import BannerPreview from './BannerPreview'
import MoreVideo from './MoreVideo'
import ListVideo from 'components/Broadcast/List'

import './style.scss'

function HomePage({
    now,
    today,
    other,
    noise,
    broadcast,
}) {

    const todayNews = today.slice(0) || {}

    const randomNews = other.slice(0, 7)
    const moreNews = other.slice(7, 13)

    const videoNews = broadcast.map(v => v.record)
    const firstVideo = now[0] || {}

    const moreVideo = videoNews.slice(2, 5)
    const listVideo = videoNews.slice(5, 8)
    
    // const todayVideos = today;

    return (
        <div className="general-news">
            <div className="general-news__container container">
                <div className="general-news__left">
                    <div className="general-news__left-wrapper">
                        <BigNews className="general-news__big-news" data={now[0]||{}} />
                        <MediaQuery maxWidth="614px">
                            <AsideVideo
                                data={firstVideo}
                                playTitle="date"
                                title="Все ключевые события этого дня"
                                main
                                videos={now}
                                className="general-news__general-video" />
                        </MediaQuery>
                        <Now data={now.slice(1, 5)} className="general-news__now" />
                        <MediaQuery minWidth="615px" maxWidth="929px">
                            <AsideVideo
                                data={firstVideo}
                                playTitle="date"
                                title="Все ключевые события этого дня"
                                main
                                videos={now}
                                className="general-news__general-video" />
                        </MediaQuery>
                    </div>
                    <div className="general-news__left-wrapper two-wrapper">
                        <Today
                            data={todayNews}
                            className="general-news__per-day" />

                        <MediaQuery minWidth="1300px">
                            {low => (
                                <MediaQuery maxWidth="929px">
                                    {high => (low || high) &&
                                        <Noise className="general-news__info-noize" data={noise} />
                                    }
                                </MediaQuery>
                            )}
                        </MediaQuery>
                        <MediaQuery minWidth="615px" maxWidth="929px">
                            <EnterOne className="general-news__enter-one" data={videoNews.slice(1)} />
                        </MediaQuery>
                    </div>
                </div>
                <div className="general-news__right right-col">
                    <MediaQuery minWidth="930px">
                        <AsideVideo
                            data={firstVideo}
                            playTitle="date"
                            title="Все ключевые события этого дня"
                            main
                            videos={now}
                            className="general-news__general-video" />
                    </MediaQuery>

                    <MediaQuery minWidth="930px" maxWidth="1299px">
                        <Noise className="general-news__info-noize" data={noise} />
                        <Banner className="general-news__banner" />
                    </MediaQuery>

                    <MediaQuery minWidth="930px">
                        {low => (
                            <MediaQuery maxWidth="614px">
                                {high => (low || high) &&
                                    <EnterOne className="general-news__enter-one" data={videoNews.slice(1)} />
                                }
                            </MediaQuery>
                        )}
                    </MediaQuery>
                </div>
                <MediaQuery maxWidth="929px" minWidth="615px">
                    <div className="general-news__middle">
                        <BannerPreview className="general-news__banner-preview" />
                    </div>
                </MediaQuery>
                <div className="general-news__left general-news__left_more">
                    <MediaQuery minWidth="1300px">
                        {low => (
                            <MediaQuery minWidth="615px" maxWidth="929px">
                                {high => (low || high)
                                    ? <div className="general-news__left-wrapper">
                                        <Banner className="general-news__banner" />
                                    </div>
                                    : <BannerPreview className="general-news__banner-preview" />
                                }
                            </MediaQuery>
                        )}
                    </MediaQuery>
                    <RandomNews className="general-news__random-news" data={randomNews} />
                </div>
                <div className="general-news__right general-news__right_more">
                    <MediaQuery minWidth="1300px">
                        <Subscribe className="general-news__subscribe"/>
                    </MediaQuery>
                    <MoreNews className="general-news__more-news" data={moreNews} />
                </div>
                <MediaQuery minWidth="1300px">
                    <div className="general-news__middle">
                        <BannerPreview className="general-news__banner-preview" />
                    </div>
                </MediaQuery>
                {/*<div className="general-news__left general-news__left_more">
                    <MoreVideo className="general-news__more-video" data={moreVideo} />
                </div>
                <div className="general-news__right general-news__right_more">
                    <ListVideo className="general-news__list-video" data={listVideo} />
                </div>*/}
            </div>
        </div>
    )
}

export default HomePage
