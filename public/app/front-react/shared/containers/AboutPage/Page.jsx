import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import About from 'components/AboutPage'

import { selectBroadcast } from 'selectors/broadcast'

import { fetch } from 'actions/broadcast'
import { fetchNoise } from 'actions/news'


class AboutPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRecords()
        this.props.fetchNoise()
    }

    render() {
        let { } = this.props

        return (
            <div>
                <Helmet>
                    <title>О телеканале</title>
                </Helmet>

                <About />
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


export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)
