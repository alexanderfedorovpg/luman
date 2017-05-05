import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import About from 'components/AboutPage'

import { selectBroadcast } from 'selectors/broadcast'

import { fetch } from 'actions/broadcast'


class AboutPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRecords()
    }

    render() {
        let { broadcast } = this.props

        return (
            <div>
                <Helmet>
                    <title>О телеканале</title>
                </Helmet>

                <About broadcast={broadcast} />
            </div>
        )
    }

}

const mapStateToProps = state => ({
    broadcast: selectBroadcast(state),
})

const mapDispatchToProps = dispatch => ({
    fetchRecords() {
        dispatch(fetch())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)
