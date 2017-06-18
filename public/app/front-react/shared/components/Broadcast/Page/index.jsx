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
import Banner from 'components/Banner'
import RandomNews from 'components/HomePage/RandomNews'
import MoreNews from 'components/HomePage/MoreNews'
import LoadMore from 'components/LoadMore'
import Aside from 'containers/Aside'

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
            items.push(this.renderItems(values.splice(0, 4)))
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

        const now = nowNews;
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
                                <MediaQuery maxWidth="1249px">
                                    <Banner type="preview" className="news-top__banner-preview" />
                                </MediaQuery>
                            </div>
                        </div>
                        <div className="right-col">
                            <MediaQuery minWidth="930px">
                                <Aside noise={null} broadcast={null} top={null} now={now} />
                                <Group title="Главные новости" margin>
                                    {nowNews.map(v => (
                                        <MiniNews key={v.id} data={v} className="broadcast__mini-news" />
                                    ))}
                                </Group>
                            </MediaQuery>
                            <MediaQuery minWidth="930px" maxWidth="1249px">
                                <div className="news-one-line__row  news-one-line__row_banners">
                                    <Banner type="large" className="news-top__banner" />
                                    <Banner type="subscribe" className="news-top__subscribe" />
                                </div>
                            </MediaQuery>
                        </div>
                        <MediaQuery minWidth="1250px">
                            <div className="news-top__middle middle-col">
                                <Banner type="preview" className="news-top__banner-preview" />
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
                        <MediaQuery minWidth="1250px">
                            <div className="news-one-line__row news-one-line__row_banners">
                                <Banner type="large" className="news-top__banner" />
                                <Banner type="subscribe" className="news-top__subscribe" />
                            </div>
                        </MediaQuery>
                        <MediaQuery maxWidth="929px">
                            <div className="news-one-line__row news-one-line__row_banners">
                                <Banner type="large" className="news-top__banner" />
                                <Banner type="subscribe" className="news-top__subscribe" />
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
