import React, { Component } from 'react'
import Masonry from 'react-masonry-component'

import Title from 'components/Title'
import Tabs from 'components/Tabs'
import MiniNews from 'components/MiniNews'
import Group from 'components/Group'
import Item from 'components/Broadcast/Item'
import List from 'components/Broadcast/List'
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

class Broadcast extends Component {

    renderAdditionalData(data) {

        return (
            <Masonry
                className={'news-top__row'}
                options={{
                    gutter: 10
                }}>
                {data.map((v, i) => (
                    <div key={i} className="news-top__row-item">
                        <Item data={v} />
                    </div>
                ))}
            </Masonry>
        )
    }

    render() {
        const {
            broadcast,
            programs,
            program,
            setProgram,
            onLoadRequest,
            canLoad
        } = this.props

        const data = broadcast.filter(v => (
            program
                ? (v.program||{}).id == program
                : true
        ))

        return (
            <div className="inner-wrapper">
                <div className="news-top">
                    <div className="news-top__container container">
                        <div className="news-top__left left-col left-col left-col_width_inner">
                            <Title>
                                Из эфира
                            </Title>
                            <Tabs data={programs} active={program} onChange={setProgram} />
                            <div className="news-one-line news-top__news-one-line">
                                <div className="news-one-line__row" style={{ marginBottom: 30 }}>
                                    <Item data={data[0]} big />
                                    <Group title="Популярное">
                                        <List data={data.slice(1, 4)} className="broadcast__popular" />
                                    </Group>
                                </div>
                                <div className="news-one-line__row">
                                    <Item data={data[4]} />
                                    <Item data={data[5]} />
                                    <Item data={data[6]} />
                                </div>
                            </div>
                            <Banner className="news-top__banner" />
                            <div className="news-one-line news-top__news-one-line">
                                <div className="news-one-line__row">
                                    <Item data={data[7]} />
                                    <Item data={data[8]} />
                                    <Item data={data[9]} />
                                </div>
                            </div>
                        </div>
                        <Aside />
                        <div className="news-top__middle middle-col">
                            <BannerPreview className="news-top__banner-preview" />
                        </div>
                        <div className="news-top__left left-col left-col left-col_width_inner">
                            <div className="news-one-line news-top__news-one-line">
                                <div className="news-one-line__row">
                                    <Item data={data[10]} />
                                    <Item data={data[11]} />
                                    <Item data={data[12]} />
                                </div>
                            </div>
                            {this.renderAdditionalData(data.slice(16))}
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
                            <List data={data.slice(13, 16)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Broadcast
