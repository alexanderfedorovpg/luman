import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Video from 'components/Aside/Video';
import Socials from 'components/Socials';
import Timeline from 'components/Timeline';
import Tabs from 'components/Tabs';
import Group from 'components/Group';
import Block from 'components/Block';
import MiniNews from 'components/MiniNews';

import {
    fetchOnline,
    fetchComments,
} from 'actions/news'

import {
    selectOnline,
    makeSelectHomeNewsByCategory
} from 'selectors/news'

import './style.scss';

const orders = [
    {
        id: 1,
        name: 'Самые новые'
    },
    {
        id: -1,
        name: 'Самые первые'
    }
];

// eslint-disable-next-line react/prefer-stateless-function
class TextStream extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            autoupdate: false,
            order: 1
        }

        this.toggleAutoupdate = this.toggleAutoupdate.bind(this)
        this.queueUpdate = this.queueUpdate.bind(this)
        this.reloadComments = this.reloadComments.bind(this)
        this.onOrderChange = this.onOrderChange.bind(this)
    }

    componentDidMount() {
        this.props.fetchOnline()

        this.queueUpdate()
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    queueUpdate() {
        if (this.state.autoupdate) {
            this.reloadComments()
        }

        this.timeout = setTimeout(this.queueUpdate, 5000)
    }

    componentWillReceiveProps(nextProps) {
        const { online, fetchComments } = nextProps

        if (online && online.id !== (this.props.online||{}).id ) {
            fetchComments(online.id);
        }
    }

    reloadComments() {
        const { online, fetchComments } = this.props

        if (online && online.id) {
            fetchComments(online.id);
        }
    }

    toggleAutoupdate(e) {
        this.setState({
            autoupdate: !this.state.autoupdate
        })
    }

    onOrderChange(v) {
        if (v !== this.state.order) {
            this.setState({
                order: v
            })
        }
    }

    render() {
        const { online, now, other } = this.props;

        const comments = (online.comments||[]).sort((a, b) => (
            this.state.order * (new Date(b.publish_date) - new Date(a.publish_date))
        ))

        return (
            <div>
                <Helmet>
                    <title>Текстовая трансляция</title>
                </Helmet>

                <div className="inner-about inner-wrapper inner-default text-stream">
                    <div className="inner-about__container container">
                        <div className="inner-about__left left-col left-col_position_relative">
                            <div className="inner-about__title text-stream__title">
                                <h1>
                                    {online.title}
                                </h1>
                                <a href="#" className="inner-about__copy">
                                    Скопировать ссылку
                                </a>
                            </div>
                            <div className="text-bg-gray text-bg-gray--primary inner-about__text-bg-gray">
                                {online.cover && (
                                    <img src={online.cover.cover_url} style={{ display: 'none' }} />
                                )}
                                <h2 className>Главное</h2>
                                <ul className="list-default list">
                                    {(online.theses||[]).map((v, i) => (
                                        <li key={i} className="list-default__item">
                                            <p>{v}</p>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    onClick={this.reloadComments}
                                    className="text-bg-gray__update"
                                >
                                    Обновить
                                </a>
                                <Socials />
                            </div>
                            <div className="inner-about__content">
                                <div className="breadcrumb-named">
                                    <div className="breadcrumb-named__sort">
                                        <div className="breadcrumb-named__sort-by">
                                            Cначала
                                        </div>
                                        <Tabs
                                            data={orders}
                                            active={this.state.order}
                                            onChange={this.onOrderChange}
                                        />
                                    </div>
                                    <div className="inner-about__new-content">
                                        <div className="checkbox-round">
                                            <input
                                                id="ko2"
                                                type="checkbox"
                                                value={this.state.autoupdate}
                                                onChange={this.toggleAutoupdate}
                                            />
                                            <label htmlFor="ko2">Обновлять автоматически</label>
                                        </div>
                                    </div>
                                </div>
                                <Timeline data={comments} />
                            </div>
                        </div>
                        <div className="inner-about__right right-col">
                            <Video data={{}} />
                            <Group title="Главные новости" margin>
                                <Block data={now[0]} />
                                {now.slice(1, 5).map(v => (
                                    <MiniNews key={v.id} data={v} className="info-noize__mini-news" />
                                ))}
                            </Group>
                            <Group title="Другие новости" margin>
                                <Block data={other[0]} />
                                {other.slice(1, 4).map(v => (
                                    <MiniNews key={v.id} data={v} className="info-noize__mini-news" />
                                ))}
                            </Group>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const selectHomeOther = makeSelectHomeNewsByCategory(3);
const selectHomeNow = makeSelectHomeNewsByCategory(1);

const mapStateToProps = state => ({
    online: selectOnline(state)[0] || {},
    now: selectHomeNow(state).map(v => v.news),
    other: selectHomeOther(state).map(v => v.news)
});

const mapDispatchToProps = dispatch => ({
    fetchOnline() {
        dispatch(fetchOnline());
    },
    fetchComments(id) {
        dispatch(fetchComments(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TextStream);
