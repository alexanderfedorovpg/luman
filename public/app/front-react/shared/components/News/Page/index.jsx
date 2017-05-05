import React from 'react'

import Title from 'components/Title'
import Tabs from 'components/Tabs'
import Video from 'components/GeneralVideo'
import Noise from 'components/Noise'
import Block from 'components/Block'
import Subscribe from 'components/Subscribe'
import Banner from 'components/HomePage/Banner'
import BannerPreview from 'components/HomePage/BannerPreview'
import RandomNews from 'components/HomePage/RandomNews'
import MoreNews from 'components/HomePage/MoreNews'
import LoadMore from 'components/LoadMore'

import './style.scss'

function News({ news, noise, rubrics, rubric, setRubric, onLoadRequest, canLoad }) {

    return (
        <div className="inner-wrapper">
            <div className="news-top">
                <div className="news-top__container container">
                    <div className="news-top__left left-col left-col left-col_width_inner">
                        <Title>
                            Новости
                        </Title>
                        <Tabs data={rubrics} active={rubric} onChange={setRubric} />
                        <div className="news-one-line news-top__news-one-line">
                            <div className="news-one-line__row">
                                <Block data={news[0]} rectangle className="news-one-line__block-rectangle" />
                                <Block data={news[1]} className="news-one-line__block-square" />
                                <Block data={news[2]} className="news-one-line__block-square" />
                                <Block data={news[3]} className="news-one-line__block-square" />
                                <Block data={news[4]} className="news-one-line__block-square" />
                            </div>
                        </div>
                        <Banner className="news-top__banner" />
                    </div>
                    <div className="news-top__right right-col">
                        <Video className="news-top__general-video" />
                        <Noise data={noise} className="news-top__info-noize" />
                    </div>
                    <div className="news-top__middle middle-col">
                        <BannerPreview className="news-top__banner-preview" />
                    </div>
                    <div className="news-top__left left-col left-col left-col_width_inner">
                        <RandomNews data={news.slice(5, 12)} className="news-top__random-news" />
                        {canLoad
                            ? (
                                <LoadMore onClick={onLoadRequest}>
                                    Больше новостей
                                </LoadMore>
                            )
                            : null
                        }
                    </div>
                    <div className="news-top__right right-col">
                        <Subscribe className="news-top__subscribe" />
                        <MoreNews data={news.slice(12, 16)} className="news-top__more-news" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News
