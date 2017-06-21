import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

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
import Video from 'components/Aside/Video'

import Datepicker from 'components/Datepicker'

import content from './programs-content';
import './style.scss'

class Broadcast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                start: null,
                end: null,
            },
        };

        this.onFilter = this.onFilter.bind(this);
        this.changeStart = this.changeDate.bind(this, 'start');
        this.changeEnd = this.changeDate.bind(this, 'end');
    }

    changeDate(type, date) {
        const { filter } = this.state;
        let start = type === 'start' ? date : filter.start;
        let end = type === 'end' ? date : filter.end;

        if (moment(start).isAfter(end)) {
            const temp = start;
            start = end;
            end = temp;
        }

        this.setState({
            filter: { start, end },
        });
    }

    onFilter() {
        if (!this.props.onFilter) {
            return;
        }

        this.props.onFilter(this.state.filter);
    }

    renderItems(data) {
        return (
            <div key={data[0].id} className="news-one-line__row news-one-line__row_margin">
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

        while (values.length) {
            items.push(this.renderItems(values.splice(0, 4)))
        }

        return items
    }

    render() {
        const {
            broadcast,
            programs,
            setProgram,
            onLoadRequest,
            canLoad,
            match,
        } = this.props

        const program = parseInt(match.params.id, 10);
        const data = broadcast.filter(v => (
            program
                ? v.program_id === program
                : true
        ));
        const selectedProgram = programs.filter(v => v.id === program)[0];
        const programName = selectedProgram ? selectedProgram.name : '';
        const { filter } = this.state;

        return (
            <div className="inner-wrapper">
                <div className="news-top news-top_programs">
                    <div className="news-top__container news-top__container-programs container">
                        <div className="news-top__left news-top__full">
                            <Title>
                                <Link className="news-top__title" to="/broadcast">
                                    Из эфира
                                </Link>
                            </Title>
                            <Tabs data={programs} active={program} onChange={setProgram} />
                        </div>
                    </div>
                    <div className="news-header news-top__news-header">
                        <div className="news-header__title">
                            <div className="container news-header__container">
                                {programName}
                                <div className={'news-header__title-logo news-header__title-logo_' + content[program].category} />
                            </div>
                        </div>
                        <div className="news-header__content">
                            <div className="container news-header__container news-header__container_position">
                                <div className={'news-header__content-container news-header__content-container_personal-description ' + content[program].big_text}>
                                    <p>{content[program].desc}</p>
                                </div>
                                <div className="container news-header__container  news-header__container_tabs">
                                    {/*<div className="news-header__tabs">
                                     <div className="news-header__tabs_item active">Лучшие моменты</div>
                                     <div className="news-header__tabs_item">Все выпуски</div>
                                     </div>*/}
                                </div>
                                <img src={content[program].photo} alt="" className={'news-header__personality ' +  content[program].big_image} />
                            </div>
                        </div>
                    </div>
                    <div className="news-top__container container">
                        <div className="middle-col">
                            <div className="news-top__left">
                                <div className="news-one-line news-top__news-one-line">
                                    <div className="news-one-line__row news-one-line__item-bottom">
                                        <MediaQuery maxWidth="1249px">

                                        </MediaQuery>
                                        <Item data={data[0]} big />
                                        <div className="news-one-line__date-wrap news-one-line__date-wrap_view-desktop">
                                            <MediaQuery minWidth="1250px">

                                            </MediaQuery>
                                            <div className="news-one-line__date">
                                                <div>
                                                    Поиск выпуска по дате эфира: c
                                                    {' '}
                                                    <Datepicker
                                                        className="small"
                                                        onChange={this.changeStart}
                                                        selectsStart
                                                        selected={filter.start}
                                                        startDate={filter.start}
                                                        endDate={filter.end}
                                                    />
                                                    по
                                                    {' '}
                                                    <Datepicker
                                                        className="small"
                                                        onChange={this.changeEnd}
                                                        selectsEnd
                                                        selected={filter.end}
                                                        startDate={filter.start}
                                                        endDate={filter.end}
                                                    />
                                                    <button
                                                        className="button"
                                                        onClick={this.onFilter}
                                                    >
                                                        Показать
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="news-one-line__date-items">
                                                <Item data={data[1]} />
                                                <Item data={data[2]} />
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
                                <Banner type="preview" className="news-top__banner-preview" />
                            </div>
                        </MediaQuery>

                        <MediaQuery minWidth="1250px">
                            <div className="left-col left-col_width_inner">
                                <Banner type="large" className="news-top__banner" />
                            </div>
                        </MediaQuery>
                        <MediaQuery minWidth="1250px">
                            <div className="right-col">
                                <Banner type="subscribe" className="news-top__subscribe-programs subscribe_in-body" />
                            </div>
                        </MediaQuery>


                        <div className="middle-col news-top__programs">
                            <div className="news-one-line__row news-one-line__row_margin">
                                <Item data={data[3]} />
                                <Item data={data[4]} />
                                <Item data={data[5]} />
                                <Item data={data[6]} />
                            </div>
                        </div>

                        <MediaQuery minWidth="1250px">
                            <div className="news-top__middle middle-col">
                                <Banner type="preview" className="news-top__banner-preview" />
                            </div>
                        </MediaQuery>

                        <MediaQuery maxWidth="1249px">
                            <div className="left-col left-col_width_inner">
                                <Banner type="large" className="news-top__banner" />
                            </div>
                        </MediaQuery>
                        <MediaQuery maxWidth="1249px">
                            <div className="right-col">
                                <Banner type="subscribe" className="news-top__subscribe-programs subscribe_in-body" />
                            </div>
                        </MediaQuery>

                        <div className="middle-col">
                            <div className="news-one-line__row news-one-line__row_margin">
                                <Item data={data[7]} />
                                <Item data={data[8]} />
                                <Item data={data[9]} />
                                <Item data={data[10]} />
                            </div>
                            {this.renderAdditionalData(data.slice(11))}
                        </div>
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

export default withRouter(Broadcast);
