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

import Datepicker from 'components/Datepicker'

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
                <div className="news-top news-top_programs">
                    <div className="news-top__container news-top__container-programs container">
                        <div className="news-top__left news-top__full">
                            <Title>
                                Из эфира
                            </Title>
                            <Tabs data={programs} active={program} onChange={setProgram} />
                        </div>
                    </div>
                    <div className="news-header news-top__news-header">
                        <div className="news-header__title">
                            <div className="container news-header__container">
                                {programs.filter(v => v.id === program)[0].name}
                                <div className="news-header__title-logo">
                                </div>
                            </div>
                        </div>
                        <div className="news-header__content">
                            <div className="container news-header__container news-header__container_personal-description">
                                <div className="news-header__content-container">
                                    <p>
                                        Лиза Каймин - наш проводник в мир кичта и гламура американской тусовки.
                                    </p>
                                    <p>
                                        В объективах камер окажутся: закрытые вечеринки, роскошные свадьбы,
                                    </p>
                                    <p>
                                        домашние приёмы олигархов, увлечения селебрити и их отвязных
                                    </p>
                                    <p>
                                        отпрысков
                                    </p>
                                </div>
                            </div>
                            <div className="container news-header__container  news-header__container_tabs">
                                <div className="news-header__tabs">
                                    <div className="news-header__tabs_item active">Лучшие моменты</div>
                                    <div className="news-header__tabs_item">Все выпуски</div>
                                </div>
                            </div>
                            <div className="container news-header__container news-header__container_personality"></div>
                        </div>
                    </div>
                    <div className="news-top__container container">
                        <div className="middle-col">
                            <div className="news-top__left">
                                <div className="news-one-line news-top__news-one-line">
                                    <div className="news-one-line__row news-one-line__item-bottom">
                                        <MediaQuery maxWidth="1249px">
                                            <div className="news-one-line__date-wrap">
                                                <div className="news-one-line__date">
                                                    <div>
                                                        <span className="news-one-line__date-title">Поиск выпуска по дате эфира:</span>
                                                        <span className="news-one-line__from-text"> c </span>
                                                        <Datepicker className='small datepicker_programm' />
                                                        <span className="news-one-line__to-text">по</span>
                                                        <Datepicker className='small datepicker_programm' />
                                                        <a href="#" className='button' role="button">Показать</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </MediaQuery>
                                        <Item data={data[0]} big />
                                        <div className="news-one-line__date-wrap news-one-line__date-wrap_view-desktop">
                                            <MediaQuery minWidth="1250px">
                                                <div className="news-one-line__date">
                                                    <div>
                                                        <span className="news-one-line__date-title">Поиск выпуска по дате эфира:</span>
                                                        <span className="news-one-line__from-text"> c </span>
                                                        <Datepicker className='small datepicker_programm' />
                                                        <span className="news-one-line__to-text">по</span>
                                                        <Datepicker className='small datepicker_programm' />
                                                        <a href="#" className='button' role="button">Показать</a>
                                                    </div>
                                                </div>
                                            </MediaQuery>
                                            <div className="news-one-line__date-items">
                                                <Item data={data[5]} />
                                                <Item data={data[6]} />
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="news-one-line__row">
                                     <Item data={data[7]} />
                                     </div>*/}
                                </div>
                            </div>
                        </div>
                        <MediaQuery maxWidth="1249px">
                            <div className="news-top__middle middle-col">
                                <BannerPreview className="news-top__banner-preview" />
                            </div>
                        </MediaQuery>

                        <MediaQuery minWidth="1250px">
                            <div className="left-col left-col_width_inner">
                                <Banner className="news-top__banner" />
                            </div>
                        </MediaQuery>
                        <MediaQuery minWidth="1250px">
                            <div className="right-col">
                                <Subscribe className="news-top__subscribe-programs" />
                            </div>
                        </MediaQuery>


                        <div className="middle-col news-top__programs">
                            <div className="news-one-line__row news-one-line__row_margin">
                                <Item data={data[8]} />
                                <Item data={data[9]} />
                                <Item data={data[10]} />
                                <Item data={data[11]} />
                            </div>
                        </div>

                        <MediaQuery minWidth="1250px">
                            <div className="news-top__middle middle-col">
                                <BannerPreview className="news-top__banner-preview" />
                            </div>
                        </MediaQuery>

                        <MediaQuery maxWidth="1249px">
                            <div className="left-col left-col_width_inner">
                                <Banner className="news-top__banner" />
                            </div>
                        </MediaQuery>
                        <MediaQuery maxWidth="1249px">
                            <div className="right-col">
                                <Subscribe className="news-top__subscribe-programs" />
                            </div>
                        </MediaQuery>

                        <div className="middle-col">
                            <div className="news-one-line__row news-one-line__row_margin">
                                <Item data={data[12]} />
                                <Item data={data[13]} />
                                <Item data={data[14]} />
                                <Item data={data[15]} />
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
                </div>
            </div>
        )
    }
}

export default Broadcast
