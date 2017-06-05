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

    const todayNews = today.slice(0)

    const randomNews = other.slice(0, 7)
    const moreNews = other.slice(7, 13)

    const videoNews = broadcast.map(v => v.record)
    const firstVideo = videoNews[0] || {}

    const moreVideo = videoNews.slice(2, 5)
    const listVideo = videoNews.slice(5, 8)

    return (
        <div className="general-news">
            <div className="general-news__container container">
                <div className="general-news__left">
                    <div className="general-news__left-wrapper">
                        <BigNews className="general-news__big-news" data={now[0]||{}} />
                        <Now data={now.slice(1, 5)} className="general-news__now" />
                        <MediaQuery minDeviceWidth="720px" maxDeviceWidth="1035px">
                            <Video
                                data={firstVideo}
                                playTitle="date"
                                title="Все ключевые события этого дня"
                                main
                                className="general-news__general-video" />
                        </MediaQuery>
                    </div>
                    <div className="general-news__left-wrapper two-wrapper">
                        <Today
                            data={todayNews}
                            className="general-news__per-day" />

                        <MediaQuery minDeviceWidth="1600px">
                            {low => (
                                <MediaQuery maxDeviceWidth="1035px">
                                    {high => (low || high) &&
                                        <Noise className="general-news__info-noize" data={noise} />
                                    }
                                </MediaQuery>
                            )}
                        </MediaQuery>
                        <MediaQuery minDeviceWidth="720px" maxDeviceWidth="1035px">
                            <EnterOne className="general-news__enter-one" data={videoNews.slice(1)} />
                        </MediaQuery>
                    </div>
                </div>
                <div className="general-news__right right-col">
                    <MediaQuery minDeviceWidth="1036px">
                        {low => (
                            <MediaQuery maxDeviceWidth="719px">
                                {high => (low || high) &&
                                    <Video
                                        data={firstVideo}
                                        playTitle="date"
                                        title="Все ключевые события этого дня"
                                        main
                                        className="general-news__general-video" />
                                }
                            </MediaQuery>
                        )}
                    </MediaQuery>

                    <MediaQuery minDeviceWidth="1036px" maxDeviceWidth="1599px">
                        <Noise className="general-news__info-noize" data={noise} />
                        <Banner className="general-news__banner" />
                    </MediaQuery>

                    <MediaQuery minDeviceWidth="1036px">
                        {low => (
                            <MediaQuery maxDeviceWidth="719px">
                                {high => (low || high) &&
                                    <EnterOne className="general-news__enter-one" data={videoNews.slice(1)} />
                                }
                            </MediaQuery>
                        )}
                    </MediaQuery>
                </div>
                <MediaQuery maxDeviceWidth="1035px">
                    <div className="general-news__middle">
                        <BannerPreview className="general-news__banner-preview" />
                    </div>
                </MediaQuery>
                <div className="general-news__left general-news__left_more">
                    <MediaQuery minDeviceWidth="1600px">
                        {low => (
                            <MediaQuery maxDeviceWidth="1035px">
                                {high => (low || high) &&
                                    <div className="general-news__left-wrapper">
                                        <Banner className="general-news__banner" />
                                    </div>
                                }
                            </MediaQuery>
                        )}
                    </MediaQuery>
                    <MediaQuery minDeviceWidth="1036px" maxDeviceWidth="1599px">
                        <BannerPreview className="general-news__banner-preview" />
                    </MediaQuery>
                    <RandomNews className="general-news__random-news" data={randomNews} />
                </div>
                <div className="general-news__right general-news__right_more">
                    <MediaQuery minDeviceWidth="1600px">
                        <Subscribe className="general-news__subscribe"/>
                    </MediaQuery>
                    <MoreNews className="general-news__more-news" data={moreNews} />
                </div>
                <MediaQuery minDeviceWidth="1600px">
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
