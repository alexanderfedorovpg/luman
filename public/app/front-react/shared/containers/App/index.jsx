import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import withRouter from 'react-router-dom/withRouter'
import { IntlProvider } from 'react-intl'
import Helmet from 'react-helmet'
import { createStructuredSelector } from 'reselect'

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
import SearchPage from 'containers/SearchPage'
import TextStream from 'containers/TextStream'

import { fetch as fetchRubrics } from 'actions/rubrics'
import { fetch as fetchPrograms } from 'actions/programs'
import { fetchHome } from 'actions/news'

import { selectWarMode, selectWarTitle } from 'selectors/news'

// import 'normalize.css/normalize.css'
import './common.scss'
import './style.scss'

addLocaleData(ruLocaleData)

class App extends Component {

    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        const { warMode, warTitle, match } = this.props

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

                    <Header war={match.isExact && warMode} warTitle={warTitle} />

                    <main>
                        <Switch>
                            <Route exact path="/" component={HomePage} />

                            <Route exact path="/noise" component={NoisePage} />
                            <Route path="/noise/:code" component={NoisePage} />

                            <Route exact path="/news" component={NewsPage} />
                            <Route path="/news/:code" component={NewsPage} />

                            <Route exact path="/broadcast" component={BroadcastPage} />
                            <Route path="/broadcast/:id" component={BroadcastPage} />

                            <Route exact path="/about" component={AboutPage} />
                            <Route exact path="/how" component={HowPage} />

                            <Route exact path="/search" component={SearchPage} />

                            <Route exact path="/text-stream" component={TextStream} />

                            <Route component={HomePage} />
                        </Switch>
                    </main>

                    <Footer />
                </div>
            </IntlProvider>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    warMode: selectWarMode,
    warTitle: selectWarTitle
})

const mapDispatchToProps = dispatch => ({
    fetchData() {
        dispatch(fetchRubrics())
        dispatch(fetchPrograms())
        dispatch(fetchHome())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
