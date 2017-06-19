import React, { Component } from 'react'
import Masonry from 'react-masonry-component'
import MediaQuery from 'react-responsive'

import Title from 'components/Title'
import Tabs from 'components/Tabs'
import MiniNews from 'components/MiniNews'
import Block from 'components/Block'
import BlockMini from 'components/Block/Mini'
import BlockBorder from 'components/Block/Border'
import Banner from 'components/Banner'
import RandomNews from 'components/HomePage/RandomNews'
import MoreNews from 'components/HomePage/MoreNews'
import LoadMore from 'components/LoadMore'
import Aside from 'containers/Aside'

import AsideVideo from 'components/HomePage/AsideVideo'

import './style.scss'

class News extends Component {

    renderItems(data) {

        return [
            <div key={data[0].id} className="news-top__row-item">
                <Block data={data[0]} rectangle />
                <Block data={data[1]} />
                <Block data={data[2]} />
            </div>,
            <div key={data[3].id} className="news-top__row-item">
                <Block data={data[3]} />
                <Block data={data[4]} />
                <Block data={data[5]} rectangle />
            </div>,
        ]
    }

    renderAdditionalData(data) {
        let items = []

        while (data.length) {
            items = items.concat(this.renderItems(data.splice(0, 6)))
        }

        return (
            <div className="news-top__row">
                {items}
            </div>
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

        const data = news

        return (
            <div className="inner-wrapper">
                <div className="news-top news-top_all-news">
                    <div className="news-top__container container">
                        <div className="news-top__left left-col left-col_width_inner">
                            <Title anchor='news'>
                                Новости
                            </Title>
                            <div className="news-one-line news-top__news-one-line">
                                <div className="news-one-line__row">
                                    <Block data={now[0]} rectangle className="news-one-line__block-rectangle" />
                                    <Block data={now[1]} className="news-one-line__block-square" />
                                    <Block data={now[2]} className="news-one-line__block-square" />
                                    <Block data={now[3]} className="news-one-line__block-square" />
                                    <Block data={now[4]} className="news-one-line__block-square" />
                                    <Block data={now[5]} className="news-one-line__block-square" />
                                    <Block data={now[6]} rectangle className="news-one-line__block-rectangle" />
                                </div>
                            </div>
                        </div>
                        <MediaQuery minWidth="930px">
                            <Aside top={null} inside broadcast={null} now={now} />
                        </MediaQuery>
                        <MediaQuery minWidth="1250px">
                            <div className="news-top__middle middle-col">
                                <Banner type="preview" className="news-top__banner-preview" />
                            </div>
                        </MediaQuery>
                        <div className="news-top__middle middle-col">
                            <MediaQuery maxWidth="929px">
                                <Banner type="preview" className="news-top__banner-preview" />
                            </MediaQuery>
                            <div className="per-day news-top__per-day">
                                <div className="per-day__wrapper">
                                    <Block data={today[0]} className="news-one-line__block-square" />
                                    <Block data={today[1]} className="news-one-line__block-square" />
                                    <Block data={today[2]} rectangle className="news-one-line__block-rectangle" />
                                </div>
                            </div>
                            <MediaQuery maxWidth="929px">
                                <div className="news-top__links">
                                    <Banner type="large" className="news-top__banner" />
                                    <Banner type="subscribe" className="news-top__subscribe" />
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth="930px" maxWidth="1249px">
                                <Banner type="preview" className="news-top__banner-preview" />
                            </MediaQuery>

                            <MediaQuery minWidth="930px" maxWidth="1249px">
                                {this.renderAdditionalData(data.slice())}
                                {canLoad && (
                                    <LoadMore onClick={onLoadRequest}>
                                        Больше новостей
                                    </LoadMore>
                                )}
                            </MediaQuery>

                        </div>

                        <MediaQuery minWidth="1250px">
                            <div className="left-col left-col_width_inner">
                                <Banner type="large" className="news-top__banner" />
                            </div>
                        </MediaQuery>
                        <MediaQuery minWidth="1250px">
                            <div className="right-col">
                                <MediaQuery minWidth="1250px">
                                    <Banner type="subscribe" className="news-top__subscribe" />
                                </MediaQuery>
                            </div>
                        </MediaQuery>

                        <MediaQuery minWidth="1250px">
                            <div className="news-top__middle middle-col">
                                {this.renderAdditionalData(data.slice())}
                                {canLoad && (
                                    <LoadMore onClick={onLoadRequest}>
                                        Больше новостей
                                    </LoadMore>
                                )}
                            </div>
                        </MediaQuery>
                    </div>
                </div>
            </div>
        )
    }
}

export default News
