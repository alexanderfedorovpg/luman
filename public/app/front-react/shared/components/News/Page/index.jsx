import React, { Component } from 'react'
import Masonry from 'react-masonry-component'
import MediaQuery from 'react-responsive'

import Title from 'components/Title'
import Tabs from 'components/Tabs'
import MiniNews from 'components/MiniNews'
import Block from 'components/Block'
import BlockMini from 'components/Block/Mini'
import BlockBorder from 'components/Block/Border'
import Subscribe from 'components/Subscribe'
import Banner from 'components/HomePage/Banner'
import BannerPreview from 'components/HomePage/BannerPreview'
import RandomNews from 'components/HomePage/RandomNews'
import MoreNews from 'components/HomePage/MoreNews'
import LoadMore from 'components/LoadMore'
import Aside from 'containers/Aside'

import './style.scss'

class News extends Component {

    renderItems(data) {

        return [
            <Block data={data[0]} />,
            <div>
                {data.slice(1, 5).map(v => (
                    <MiniNews key={v.id} data={v} className="news-top__mini-news" />
                ))}
            </div>,
            <Block data={data[5]} />,
            <div>
                {data.slice(6, 10).map(v => (
                    <MiniNews key={v.id} data={v} className="news-top__mini-news" />
                ))}
            </div>,
            <BlockBorder data={data[10]} />,
        ]
    }

    renderAdditionalData(data) {
        let items = []

        while (data.length) {
            items = items.concat(this.renderItems(data.splice(0, 11)))
        }

        return (
            <Masonry
                className={'news-top__row'}
                options={{
                    gutter: 10
                }}>
                {items.map((v, i) => (
                    <div key={i} className="news-top__row-item">
                        {v}
                    </div>
                ))}
            </Masonry>
        )
    }

    render() {
        const {
            news,
            now,
            today,
            rubrics,
            rubric,
            setRubric,
            onLoadRequest,
            canLoad
        } = this.props

        const data = news.filter(v => (
            rubric
                ? v.rubrics.find(({ id }) => id == rubric)
                : true
        ))

        return (
            <div className="inner-wrapper">
                <div className="news-top news-top_all-news">
                    <div className="news-top__container container">
                        <div className="news-top__left left-col left-col left-col_width_inner">
                            <Title>
                                Новости
                            </Title>
                            { /*<Tabs data={rubrics} active={rubric} onChange={setRubric} /> */}
                            <div className="news-one-line news-top__news-one-line">
                                <div className="news-one-line__row">
                                    <Block data={now[0]} rectangle className="news-one-line__block-rectangle" />
                                    <Block data={now[1]} className="news-one-line__block-square" />
                                    <Block data={now[2]} className="news-one-line__block-square" />
                                    <Block data={now[3]} className="news-one-line__block-square" />
                                    <Block data={now[4]} className="news-one-line__block-square" />
                                </div>
                            </div>
                            <MediaQuery minDeviceWidth="1600px">
                                <Banner className="news-top__banner" />
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth="1035px">
                                <BannerPreview className="news-top__banner-preview" />
                            </MediaQuery>
                            <div className="per-day news-top__per-day">
                                <p className="per-day__title section-title">
                                    Главное за последние сутки
                                </p>
                                <div className="per-day__wrapper">
                                    <Block data={today[0]} className="news-one-line__block-square" />
                                    <Block data={today[1]} className="news-one-line__block-square" />
                                    <Block data={today[2]} className="news-one-line__block-square" />
                                </div>
                            </div>
                            <MediaQuery maxDeviceWidth="1035px">
                                <div className="news-top__links">
                                    <Banner className="news-top__banner" />
                                    <Subscribe className="news-top__subscribe" />
                                </div>
                            </MediaQuery>
                            <MediaQuery minDeviceWidth="1036px" maxDeviceWidth="1599px">
                                <BannerPreview className="news-top__banner-preview" />
                            </MediaQuery>

                            <MediaQuery minDeviceWidth="1036px" maxDeviceWidth="1599px">
                                <RandomNews data={data.slice(0, 7)} className="news-top__random-news" />
                                {this.renderAdditionalData(data.slice(11))}
                                {canLoad
                                    ? (
                                        <LoadMore onClick={onLoadRequest}>
                                            Больше новостей
                                        </LoadMore>
                                    )
                                    : null
                                }
                            </MediaQuery>

                        </div>
                        <MediaQuery minDeviceWidth="1036px">
                            <Aside />
                            <MediaQuery minDeviceWidth="1036px" maxDeviceWidth="1599px">
                                <MoreNews data={data.slice(7, 11)} className="news-top__more-news" />
                            </MediaQuery>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth="1600px">
                            <div className="news-top__middle middle-col">
                                <BannerPreview className="news-top__banner-preview" />
                            </div>
                        </MediaQuery>

                        <MediaQuery minDeviceWidth="1600px">
                            <div className="news-top__left left-col left-col left-col_width_inner">
                                <RandomNews data={data.slice(0, 7)} className="news-top__random-news" />
                                {this.renderAdditionalData(data.slice(11))}
                                {canLoad
                                    ? (
                                        <LoadMore onClick={onLoadRequest}>
                                            Больше новостей
                                        </LoadMore>
                                    )
                                    : null
                                }
                            </div>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth="1036px">
                            <div className="news-top__right right-col">
                                <MediaQuery minDeviceWidth="1600px">
                                    <Subscribe className="news-top__subscribe" />
                                </MediaQuery>
                                <MediaQuery minDeviceWidth="1600px">
                                    <MoreNews data={data.slice(7, 11)} className="news-top__more-news" />
                                </MediaQuery>
                            </div>
                        </MediaQuery>
                    </div>
                </div>
            </div>
        )
    }
}

export default News
