import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import {
    selectNoise,
    selectNoiseData,
    selectNoisePagination,
    selectRelated,
    makeSelectHomeNewsByCategory
} from 'selectors/news'
import { selectBroadcast } from 'selectors/broadcast'

import {
    fetchNoise,
    fetchMoreNoise,
    fetchRelated
} from 'actions/news'
import { fetch as fetchRecords } from 'actions/broadcast'

import Detail from 'components/NewsDetail'
import Noise from 'components/Noise/Page'

class NoisePage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { match } = this.props

        this.props.fetchNoise()
        this.props.fetchRecords()

        if (match.params.code) {
            this.fetchItem(this.getId())
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.code !== nextProps.match.params.code) {

            if (nextProps.match.params.code) {
                this.fetchItem(this.getId(nextProps.match.params.code))
            }
        }
    }

    /**
     * вернет ид новости
     */
    getId(code = false) {
        const { match } = this.props;
        if(code) return +code.match(/^(\d)+/)[0]
        if (match.params.code){
            let id = +match.params.code.match(/^(\d)+/)[0]
            return id
        }else{
            return null;
        }
    }
    // загружает новость, если ее нет в списке
    // также загружает "новости по теме"
    fetchItem(id) {
        if (!this.getById(id)) {
            this.props.fetchNoise({ id })
        }
        this.props.fetchRelated(id)
    }

    getById(id) {
        const { noiseData } = this.props

        return noiseData[id] || {}
    }

    render() {
        let {
            noise,
            loadMore,
            match,
            relatedNews,
            broadcast,
            pagination,
            now
        } = this.props

        const item = this.getById(this.getId())

        return (
            <div>
                <Helmet>
                    <title>
                        {match.params.code
                            ? `Инфошум - ${item.title||''}`
                            : 'Инфошум'
                        }
                    </title>
                </Helmet>

                {match.params.code
                    ? (
                        <Detail
                            data={item}
                            noise={noise}
                            now={now.map(v => v.news)}
                            related={relatedNews}
                            broadcast={broadcast} />
                    )
                    : (
                        <Noise
                            onLoadRequest={loadMore}
                            canLoad={pagination.page < pagination.lastPage}
                            noise={noise} />
                    )
                }
            </div>
        )
    }
}

const selectHomeNow = makeSelectHomeNewsByCategory(1);

const mapStateToProps = state => ({
    noise: selectNoise(state),
    noiseData: selectNoiseData(state),
    pagination: selectNoisePagination(state),
    relatedNews: selectRelated(state),
    broadcast: selectBroadcast(state),
    now: selectHomeNow(state),
})

const mapDispatchToProps = dispatch => ({
    fetchNoise(params) {
        dispatch(fetchNoise(params))
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id))
    },
    fetchRecords() {
        dispatch(fetchRecords())
    },
    loadMore() {
        dispatch(fetchMoreNoise())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NoisePage)
