import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import withRouter from 'react-router-dom/withRouter'
import { IntlProvider } from 'react-intl'
import Helmet from 'react-helmet'

import { addLocaleData } from 'react-intl'
import ruLocaleData from 'react-intl/locale-data/ru'

import config from 'config'

import Header from 'components/Header'
import Footer from 'components/Footer'

import HomePage from 'containers/HomePage'
import NoisePage from 'containers/NoisePage'
import NewsPage from 'containers/NewsPage'
import BroadcastPage from 'containers/BroadcastPage'
import AboutPage from 'containers/AboutPage'
import HowPage from 'containers/HowPage'

import { fetch as fetchRubrics } from 'actions/rubrics'
import { selectWarMode } from 'selectors/news'

// import 'normalize.css/normalize.css'
import './style.scss'

addLocaleData(ruLocaleData)

class App extends Component {

    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        const { warMode, match } = this.props

        return (
            <IntlProvider locale="ru">
                <div className={classNames('root', { war: match.isExact && warMode })}>
                    <Helmet>
                        <html lang="ru" />
                        <meta charSet="utf-8" />
                        <title>{config('htmlPage.defaultTitle')}</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="format-detection" content="telephone=no" />
                        <meta name="HandheldFriendly" content="true" />
                    </Helmet>

                    <Header war={match.isExact && warMode} />

                    <main>
                        <Switch>
                            <Route exact path="/" component={HomePage} />

                            <Route exact path="/noise" component={NoisePage} />
                            <Route path="/noise/:id" component={NoisePage} />

                            <Route exact path="/news" component={NewsPage} />
                            <Route path="/news/:id" component={NewsPage} />

                            <Route exact path="/broadcast" component={BroadcastPage} />
                            <Route path="/broadcast/:id" component={BroadcastPage} />

                            <Route exact path="/about" component={AboutPage} />
                            <Route exact path="/how" component={HowPage} />

                            <Route component={HomePage} />
                        </Switch>
                    </main>

                    <Footer />
                </div>
            </IntlProvider>
        )
    }
}

const mapStateToProps = state => ({
    warMode: selectWarMode(state)
})

const mapDispatchToProps = dispatch => ({
    fetchData() {
        dispatch(fetchRubrics())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
