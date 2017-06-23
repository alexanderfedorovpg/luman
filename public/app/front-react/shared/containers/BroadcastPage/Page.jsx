import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import stubImage from './stub.png'

import {
    selectNoise,
    selectRelated,
    makeSelectHomeNewsByCategory
} from 'selectors/news'
import {
    selectProgram,
    selectBroadcast,
    selectBroadcastData,
    selectCanLoad,
} from 'selectors/broadcast'
import { selectPrograms } from 'selectors/programs'

import { fetchNoise, fetchRelated } from 'actions/news'
import { fetch, fetchMore, setProgram } from 'actions/broadcast'

import Detail from 'components/Broadcast/Page/Detail'
import Broadcast from 'components/Broadcast/Page'
import BroadcastStub from 'components/Broadcast/Page/stub.jsx'

const SHOW_STUB = false; // показываем заглушку

class BroadcastPage extends PureComponent {

    constructor(props) {
        super(props);

        this.toPrograms = this.toPrograms.bind(this);
    }

    asyncBootstrap() {
        const { match } = this.props

        this.props.fetchNoise()

        if (match.params.id) {
            this.fetchItem(match.params.id)
        }else{
            this.props.setProgram(null);

        }
    }

    componentDidMount() {
        this.asyncBootstrap()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {

            if (nextProps.match.params.id) {
                this.fetchItem(nextProps.match.params.id)
            }
        }
    }

    // загружает новость, если ее нет в списке
    // также загружает "новости по теме"
    fetchItem(id) {
        if (!this.getById(id)) {
            this.props.fetch({ id })
        }
        this.props.fetchRelated(id)
    }

    toPrograms(id) {
        const { history, setProgram } = this.props;

        setProgram(id);
        if (id) {
            history.push({
                pathname: '/programs/' + id
            });
        } else {
            // history.push({
            //     pathname: 'broadcast'
            // })
        }

    }

    getById(id) {
        const { broadcastData } = this.props

        return broadcastData[id]
    }

    render() {
        let {
            match,
            broadcast,
            program,
            programs,
            canLoad,
            nowNews,
            relatedNews,
            setProgram,
            loadMore
        } = this.props
        const item = this.getById(match.params.id) || {}

        if(SHOW_STUB){
            return (
                <div>
                    <Helmet>
                        <title>Из эфира</title>
                    </Helmet>
                    <BroadcastStub
                        stubImage={stubImage}
                        nowNews={nowNews.map(v => v.news)} />
                </div>
            )
        }

        return (
            <div>
                <Helmet>
                    <title>Из эфира</title>
                    {item.id && <meta property="og:title" content={`Из эфира: ${item.title||''}`} />}
                    {item.id && <meta property="og:url" content={item.uri} />}
                    {item.id && <meta property="og:image" content={item.image_main && item.image_main.url} />}
                    {item.id && <meta property="og:image:secure_url" content={item.image_main && item.image_main.url} />}
                </Helmet>

                {match.params.id
                    ? <Detail
                        data={item}
                        relatedNews={relatedNews}
                        nowNews={nowNews.map(v => v.news)}
                    />
                    : <Broadcast
                        nowNews={nowNews.map(v => v.news)}
                        broadcast={broadcast}
                        onLoadRequest={loadMore}
                        canLoad={canLoad}
                        setProgram={this.toPrograms}
                        programs={programs}
                    />
                }
            </div>
        )
    }
}

const selectNowNews = makeSelectHomeNewsByCategory(1)

const mapStateToProps = state => ({
    broadcast: selectBroadcast(state),
    broadcastData: selectBroadcastData(state),
    programs: selectPrograms(state),
    program: selectProgram(state),
    nowNews: selectNowNews(state),
    relatedNews: selectRelated(state),
    canLoad: selectCanLoad(state),
})

const mapDispatchToProps = dispatch => ({
    fetch(params) {
        dispatch(fetch(params))
    },
    loadMore() {
        dispatch(fetchMore())
    },
    setProgram(id) {
        dispatch(setProgram(id))
        dispatch(fetch({ replace: true }))
    },
    fetchNoise() {
        dispatch(fetchNoise())
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastPage)
