import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import {
    selectNoise,
    selectRelated,
    selectNewsData
} from 'selectors/news'
import { selectBroadcast } from 'selectors/broadcast'

import { fetch, fetchRelated } from 'actions/news'
import { fetch as fetchRecords } from 'actions/broadcast'

import Detail from 'components/NewsDetail'

class NoisePage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { match } = this.props

        this.props.fetch()
        this.props.fetchRecords()

        if (match.params.id) {
            this.props.fetch({ id: match.params.id })
            this.props.fetchRelated(match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetch({ id: nextProps.match.params.id })

            if (nextProps.match.params.id) {
                this.props.fetchRelated(nextProps.match.params.id)
            }
        }
    }

    getById(id) {
        const { newsData } = this.props

        return newsData[id] || {}
    }

    render() {
        let { news, match, relatedNews, broadcast } = this.props
        const item = this.getById(match.params.id)

        return (
            <main>
                <Helmet>
                    <title>Инфошум</title>
                </Helmet>

                <Detail
                    data={item}
                    noise={news}
                    related={relatedNews}
                    broadcast={broadcast} />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    news: selectNoise(state),
    newsData: selectNewsData(state),
    relatedNews: selectRelated(state),
    broadcast: selectBroadcast(state)
})

const mapDispatchToProps = dispatch => ({
    fetch(params) {
        dispatch(fetch(params))
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id))
    },
    fetchRecords() {
        dispatch(fetchRecords())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(NoisePage)
