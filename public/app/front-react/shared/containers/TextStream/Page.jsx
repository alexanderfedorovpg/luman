import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Video from 'components/Aside/Video';
import Socials from 'components/Socials';
import Timeline from 'components/Timeline';

import {
    fetchOnline,
    fetchComments
} from 'actions/news'

import {
    selectOnline
} from 'selectors/news'

import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TextStream extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            autoupdate: false
        }

        this.toggleAutoupdate = this.toggleAutoupdate.bind(this)
        this.queueUpdate = this.queueUpdate.bind(this)
        this.reloadComments = this.reloadComments.bind(this)
    }

    componentDidMount() {
        this.props.fetchOnline()

        this.queueUpdate()
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    queueUpdate() {
        console.log(this)
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

    render() {
        const { online } = this.props;

        return (
            <div>
                <Helmet>
                    <title>Текстовая трансляция</title>
                </Helmet>

                <div className="inner-about inner-wrapper inner-default text-stream">
                    <div className="inner-about__container container">
                        <div className="inner-about__left left-col left-col_position_relative">
                            <div className="inner-about__title">
                                <h1>
                                    {online.title}
                                </h1>
                                <a href="#" className="inner-about__copy">
                                    Скопировать ссылку
                                </a>
                            </div>
                            <div className="text-bg-gray text-bg-gray--primary inner-about__text-bg-gray">
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
                                        <div className="breadcrumb">
                                            <ul className="breadcrumb__ul">
                                                <li className="breadcrumb__item breadcrumb__item breadcrumb__item_active">
                                                    <a className="breadcrumb__link" href="javascript:void(0)">Самые новые</a>
                                                </li>
                                                <li className="breadcrumb__item">
                                                    <a className="breadcrumb__link" href="javascript:void(0)">Самые первые</a>
                                                </li>
                                            </ul>
                                        </div>
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
                                <Timeline data={online.comments} />
                            </div>
                        </div>
                        <div className="inner-about__right right-col">
                            <Video data={{}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    online: selectOnline(state)[0] || {}
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
