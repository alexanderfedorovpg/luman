import React, { Component } from 'react'
import Helmet from 'react-helmet';

import { Wrap, Left, Right } from 'components/Content'
import Header from 'components/Working/Header'
import Content from 'components/Working/Content'

class WorkingPage extends Component {

    render() {
        let {
            menuOpen
        } = this.props

        return (
            <div>
                <Helmet
                    title="В работе" />

                <Header moved={menuOpen} />
                <Wrap>
                    <Content />
                </Wrap>
            </div>
        )
    }
}

export default WorkingPage
