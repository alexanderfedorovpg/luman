import React from 'react'
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
import AboutPage from 'containers/AboutPage'

import 'normalize.css/normalize.css'
import './style.scss'

addLocaleData(ruLocaleData)

function App() {
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
                    <Route exact path="/about" component={AboutPage} />
                </Switch>

                <Footer />
            </div>
        </IntlProvider>
    )
}

export default App
