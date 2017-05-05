import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import {
    selectNoise,
    selectRelated,
} from 'selectors/news'
import {
    selectBroadcast,
    selectBroadcastData
} from 'selectors/broadcast'

// import { fetch, fetchRelated } from 'actions/news'
import { fetch } from 'actions/broadcast'

import Detail from 'components/Broadcast/Page'

class BroadcastPage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { match } = this.props

        this.props.fetch()

        if (match.params.id) {
            this.props.fetch({ id: match.params.id })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetch({ id: nextProps.match.params.id })
        }
    }

    getById(id) {
        const { broadcastData } = this.props

        return broadcastData[id] || {}
    }

    render() {
        let { match, broadcast } = this.props
        const item = this.getById(match.params.id)

        return (
            <div>
                <Helmet>
                    <title>Из эфира</title>
                </Helmet>

                {match.params.id
                    ? <Detail data={item} />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    broadcast: selectBroadcast(state),
    broadcastData: selectBroadcastData(state),
    // relatedNews: selectRelated(state),
    // broadcast: selectBroadcast(state)
})

const mapDispatchToProps = dispatch => ({
    fetch(params) {
        dispatch(fetch(params))
    },
    // fetchRelated(id) {
    //     dispatch(fetchRelated(id))
    // },
    // fetchRecords() {
    //     dispatch(fetchRecords())
    // },
})

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastPage)
