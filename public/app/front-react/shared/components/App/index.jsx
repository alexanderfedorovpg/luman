import 'normalize.css/normalize.css'

import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Helmet from 'react-helmet'

import config from 'config'

import Header from 'components/Header'
import Footer from 'components/Footer'

import HomePage from 'containers/HomePage'

import './style.scss'

function App() {
    return (
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
    )
}

export default App
