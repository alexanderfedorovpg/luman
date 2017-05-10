import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import {
    selectNoise,
    selectNoiseData,
    selectNoisePagination,
    selectRelated,
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
            pagination
        } = this.props

        const item = this.getById(match.params.id)

        return (
            <div>
                <Helmet>
                    <title>
                        {match.params.id
                            ? `Инфошум - ${item.title}`
                            : 'Инфошум'
                        }
                    </title>
                </Helmet>

                {match.params.id
                    ? (
                        <Detail
                            data={item}
                            noise={noise}
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

const mapStateToProps = state => ({
    noise: selectNoise(state),
    noiseData: selectNoiseData(state),
    pagination: selectNoisePagination(state),
    relatedNews: selectRelated(state),
    broadcast: selectBroadcast(state)
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
