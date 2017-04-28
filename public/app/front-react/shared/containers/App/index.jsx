import React, { Component } from 'react'
import { connect } from 'react-redux'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import { IntlProvider } from 'react-intl'
import Helmet from 'react-helmet'

import { addLocaleData } from 'react-intl'
import ruLocaleData from 'react-intl/locale-data/ru'

import config from 'config'

import Header from 'components/Header'
import Footer from 'components/Footer'

import HomePage from 'containers/HomePage'

import { fetch as fetchRubrics } from 'actions/rubrics'

import 'normalize.css/normalize.css'
import './style.scss'

addLocaleData(ruLocaleData)

class App extends Component {

    asyncBootstrap() {
        this.props.fetchData()
    }

    render() {

        return (
            <IntlProvider locale="ru">
                <div>
                    <Helmet>
                        <html lang="ru" />
                        <meta charSet="utf-8" />
                        <title>{config('htmlPage.defaultTitle')}</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="format-detection" content="telephone=no" />
                        <meta name="HandheldFriendly" content="true" />
                    </Helmet>

                    <Header />

                    <Switch>
                        <Route exact path="/" component={HomePage} />
                    </Switch>

                    <Footer />
                </div>
            </IntlProvider>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    fetchData() {
        dispatch(fetchRubrics())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
