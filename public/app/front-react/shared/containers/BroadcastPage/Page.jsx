import React, { PureComponent } from 'react'
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
    selectPagination,
    selectBroadcast,
    selectBroadcastData
} from 'selectors/broadcast'
import { selectPrograms } from 'selectors/programs'

import { fetchNoise, fetchRelated } from 'actions/news'
import { fetch, fetchMore, setProgram } from 'actions/broadcast'

import Detail from 'components/Broadcast/Page/Detail'
import Broadcast from 'components/Broadcast/Page'
import BroadcastStub from 'components/Broadcast/Page/stub.jsx'

const SHOW_STUB = true; // показываем заглушку

class BroadcastPage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { match } = this.props

        this.props.fetch()
        this.props.fetchNoise()

        if (match.params.id) {
            this.fetchItem(match.params.id)
        }
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
            pagination,
            nowNews,
            setProgram,
            loadMore
        } = this.props
        const item = this.getById(match.params.id) || {}
        const p = [{ id: null, name: 'Все сразу' }, ...programs]

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
                </Helmet>

                {match.params.id
                    ? <Detail
                        data={item}
                        nowNews={nowNews.map(v => v.news)}
                    />
                    : <Broadcast
                        nowNews={nowNews.map(v => v.news)}
                        broadcast={broadcast}
                        onLoadRequest={loadMore}
                        canLoad={pagination.page < pagination.lastPage}
                        setProgram={setProgram}
                        programs={p}
                        program={program}
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
    pagination: selectPagination(state),
    nowNews: selectNowNews(state),
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
        dispatch(fetch())
    },
    fetchNoise() {
        dispatch(fetchNoise())
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastPage)
