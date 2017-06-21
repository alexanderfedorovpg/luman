import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import How from 'components/HowPage'

import { selectBroadcast } from 'selectors/broadcast'

import { fetch } from 'actions/broadcast'
import { fetchNoise } from 'actions/news'


class HowPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    asyncBootstrap() {
        this.props.fetchRecords()
        this.props.fetchNoise()
    }

    componentDidMount() {
        this.asyncBootstrap()
    }

    render() {
        let { } = this.props

        return (
            <div>
                <Helmet>
                    <title>Как смотреть RTVi</title>
                </Helmet>
                <How />
            </div>
        )
    }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    fetchRecords() {
        dispatch(fetch())
    },
    fetchNoise() {
        dispatch(fetchNoise())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(HowPage)
