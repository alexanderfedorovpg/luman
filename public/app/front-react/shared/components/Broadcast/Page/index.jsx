import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

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
import Video from 'components/Aside/Video'

import './style.scss'

class Broadcast extends Component {

    renderItems(data) {
        return (
            <div className="news-one-line__row">
                <Item data={data[0]} />
                <Item data={data[1]} />
                <Item data={data[2]} />
                <Item data={data[3]} />
            </div>
        )
    }

    renderAdditionalData(data) {
        let items = []
        let values = [...data]

        while (data.length) {
            items = items.push(this.renderItems(values.splice(0, 4)))
        }

        return items
    }

    render() {
        const {
            broadcast,
            programs,
            program,
            setProgram,
            nowNews,
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
                <div className="news-top news-top_broadcast">
                    <div className="news-top__container container">
                        <div className="news-top__left left-col left-col left-col_width_inner">
                            <Title anchor="broadcast">
                                Из эфира
                            </Title>
                            <Tabs data={programs} active={program} onChange={setProgram} />
                            <div className="news-one-line news-top__news-one-line">
                                <div className="news-one-line__row news-one-line__row_top">
                                    <Item data={data[0]} big />
                                    <List data={data.slice(1, 5)} className="broadcast__popular" />
                                </div>
                                <div className="news-one-line__row news-one-line__row_item-top">
                                    <Item data={data[5]} />
                                    <Item data={data[6]} />
                                    <Item data={data[7]} />
                                </div>
                                <MediaQuery maxDeviceWidth="1599px">
                                    <BannerPreview className="news-top__banner-preview" />
                                </MediaQuery>
                            </div>
                        </div>
                        <div className="right-col">
                            <MediaQuery minDeviceWidth="1036px">
                                <Video data={{}} />
                                <Group title="Главные новости" margin>
                                    {nowNews.map(v => (
                                        <MiniNews key={v.id} data={v} className="broadcast__mini-news" />
                                    ))}
                                </Group>
                            </MediaQuery>
                            <MediaQuery minDeviceWidth="1036px" maxDeviceWidth="1599px">
                                <div className="news-one-line__row">
                                    <Banner className="news-top__banner" />
                                    <Subscribe />
                                </div>
                            </MediaQuery>
                        </div>
                        <MediaQuery minDeviceWidth="1600px">
                            <div className="news-top__middle middle-col">
                                <BannerPreview className="news-top__banner-preview" />
                            </div>
                        </MediaQuery>
                        <div className="news-top__middle_ether news-top__middle_ether">
                            <div className="news-one-line__row news-one-line__row_after-preview">
                                <Item data={data[8]} />
                                <Item data={data[9]} />
                                <Item data={data[10]} />
                                <Item data={data[11]} />
                            </div>
                        </div>
                        <MediaQuery minDeviceWidth="1600px">
                            <div className="news-one-line__row">
                                <Banner className="news-top__banner" />
                                <Subscribe />
                            </div>
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth="1035px">
                            <div className="news-one-line__row news-one-line__row_banners">
                                <Banner className="news-top__banner" />
                                <Subscribe className="news-top__subscribe" />
                            </div>
                        </MediaQuery>
                        <div className="news-top__middle_ether">
                            <div className="news-one-line__row news-one-line__row_after-banners">
                                <Item data={data[12]} />
                                <Item data={data[13]} />
                                <Item data={data[14]} />
                                <Item data={data[15]} />
                            </div>
                        </div>
                        <div className="news-top__middle_ether">
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Broadcast
