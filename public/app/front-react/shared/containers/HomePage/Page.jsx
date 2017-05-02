import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { selectHome, selectHomeBroadcast } from 'selectors/news'

import { fetchHome } from 'actions/news'

import Home from 'components/HomePage'

class HomePage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchHome()
    }

    render() {
        let { broadcast, home } = this.props

        return (
            <main>
                <Helmet>
                    <title>Главная</title>
                </Helmet>

                <Home data={home} broadcast={broadcast} />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    home: selectHome(state),
    broadcast: selectHomeBroadcast(state)
})

const mapDispatchToProps = dispatch => ({
    fetchHome() {
        dispatch(fetchHome())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
