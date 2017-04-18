import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { getAll } from 'reducers/news'

import { fetch } from 'actions/news'

import Home from 'components/HomePage'

class HomePage extends PureComponent {

    constructor(props) {
        super(props);

    }

    asyncBootstrap() {
        this.props.fetchNews()
    }

    render() {

        return (
            <div>
                <Helmet>
                    <title>Главная</title>
                </Helmet>

                <Home />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    news: getAll(state)
})

const mapDispatchToProps = dispatch => ({
    fetchNews() {
        dispatch(fetch())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
