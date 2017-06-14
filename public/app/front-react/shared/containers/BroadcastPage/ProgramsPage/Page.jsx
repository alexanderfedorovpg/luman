import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import stubImage from './stub.png'

import {
    selectNoise,
    selectRelated,
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

import Detail from 'components/NewsDetail'
import Broadcast from 'components/Broadcast/Programs/index.jsx'
import BroadcastStub from 'components/Broadcast/Page/stub.jsx'

const SHOW_STUB = false; // показываем заглушку

class BroadcastProgramsPage extends PureComponent {

    constructor(props) {
        super(props);

        this.toPrograms = this.toPrograms.bind(this);

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

    toPrograms(id) {
        const { history, setProgram } = this.props;

        setProgram(id);
        if (id) {
            history.push({
                pathname: '/programs/' + id
            });
        } else {
            history.push({
                pathname: '/broadcast'
            })
        }

    }


    render() {
        let {
            match,
            broadcast,
            noise,
            relatedNews,
            program,
            programs,
            pagination,
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
                    <BroadcastStub stubImage={stubImage}/>
                </div>
            )
        }else{
            return (
                <div>
                    <Helmet>
                        <title>Из эфира</title>
                    </Helmet>

                    {!match.params.id
                        ? 
                        null
                        :
                        <Broadcast
                            dataId={match.params.id} 
                            broadcast={broadcast}
                            onLoadRequest={loadMore}
                            canLoad={pagination.page < pagination.lastPage}
                            setProgram={this.toPrograms}
                            programs={p}
                            program={program}
                        />
                    }
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    broadcast: selectBroadcast(state),
    broadcastData: selectBroadcastData(state),
    programs: selectPrograms(state),
    program: selectProgram(state),
    pagination: selectPagination(state),
    relatedNews: selectRelated(state),
    noise: selectNoise(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastProgramsPage)
