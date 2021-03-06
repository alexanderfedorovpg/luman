import React from 'react'
import classNames from 'classnames'

import BigNews from './BigNews'
import Now from './Now'
import NowWar from './NowWar'
import Today from './Today'
import Group from 'components/Group'
import Block from 'components/Block'
import MiniNews from 'components/MiniNews'
import Video from 'components/GeneralVideo'
import VideoWrapper from 'components/GeneralVideo/Wrapper'
import Banner from 'components/Banner'
import RandomNews from './RandomNews'
import MoreNews from './MoreNews'
import MoreVideo from './MoreVideo'
import ListVideo from 'components/Broadcast/List'
import AsideVideo from './AsideVideo'

import mainVideoPlaceholder from './obzor-main-new.jpg'
import './style.scss'

function HomePage({
    title,
    online,
    now,
    today,
    other,
    breakingNews,
    newsBlock,
    broadcast,
}) {

    const todayNews = today.slice(0)

    const randomNews = other.slice(0, 7)
    const moreNews = other.slice(7, 13)

    const videoNews = broadcast.map(v => v.record)
    const firstVideo = now[0] || {}
    const secondVideo = videoNews[1] || {}

    const moreVideo = videoNews.slice(2, 5)
    const listVideo = videoNews.slice(5, 8)

    return (
        <div className="general-news">
            <div className="general-news__container container">
                <div className="general-news__left">
                    <div className="general-news__left-wrapper">
                        <BigNews
                            war
                            warTitle={title}
                            className="general-news__big-news" data={breakingNews[0]||{}} />
                        <NowWar data={online[0]} className="general-news__now-war" />
                    </div>
                    <div className="general-news__left-wrapper two-wrapper">
                        <Today
                            data={todayNews}
                            war
                            className="general-news__per-day general-news__per-day_war" />

                        <div className="info-noize general-news__info-noize general-news__info-noize_war">
                            <Block
                                data={todayNews[2]}
                                war
                                warTitle={secondVideo.title}
                                className="info-noize__block-square info-noize__block-square_war" />
                            <div className="info-noize__wrapper">
                                {todayNews.slice(3, 7).map(v => (
                                    <MiniNews key={v.id} data={v} className="info-noize__mini-news info-noize__mini-news_war" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="general-news__right right-col">
                    {firstVideo.video_stream
                        ? (
                            <AsideVideo
                                data={firstVideo}
                                playTitle="date"
                                title="Все ключевые события этого дня"
                                main
                                videos={now}
                                className="general-news__general-video general-video_idx"/>
                        )
                        : (
                            <img src={mainVideoPlaceholder} className="general-video__img" />
                        )
                    }
                    <Group title="Другие новости" margin>
                        {newsBlock.slice(0, 4).map(v => (
                            <MiniNews key={v.id} data={v} className="info-noize__mini-news info-noize__mini-news_war" />
                        ))}
                    </Group>
                </div>
                <div className="general-news__left general-news__left_more">
                    <div className="general-news__left-wrapper">
                        <Banner type="large" className="general-news__banner" />
                    </div>
                    <RandomNews className="general-news__random-news" data={randomNews} />
                </div>
                <div className="general-news__right general-news__right_more">
                    <Banner type="subscribe" className="general-news__subscribe subscribe_in-body"/>
                    {newsBlock.slice(4, 10).map(v => (
                        <MiniNews key={v.id} data={v} className="info-noize__mini-news info-noize__mini-news_war" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage
