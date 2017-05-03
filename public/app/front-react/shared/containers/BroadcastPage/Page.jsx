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

class BroadcastPage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // const { match } = this.props

        // this.props.fetch()
        // this.props.fetchRecords()
        // this.props.fetchRelated(match.params.id)
    }

    getById(id) {
        const { newsData } = this.props

        return newsData[id] || {}
    }

    render() {
        // let { news, match, relatedNews, broadcast } = this.props
        // const item = this.getById(match.params.id)

        return (
            <main>
                <Helmet>
                    <title>Из эфира</title>
                </Helmet>

                Из эфира
            </main>
        )
    }
}

const mapStateToProps = state => ({
    // news: selectNoise(state),
    // newsData: selectNewsData(state),
    // relatedNews: selectRelated(state),
    // broadcast: selectBroadcast(state)
})

const mapDispatchToProps = dispatch => ({
    // fetch() {
    //     dispatch(fetch())
    // },
    // fetchRelated(id) {
    //     dispatch(fetchRelated(id))
    // },
    // fetchRecords() {
    //     dispatch(fetchRecords())
    // },
})

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastPage)
