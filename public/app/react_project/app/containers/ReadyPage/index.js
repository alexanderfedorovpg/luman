import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import Header from 'components/Ready/Header'
import Content from 'components/Ready/Content'
import { Wrap } from 'components/Content'

class ReadyPage extends PureComponent {

    render() {

        return (
            <div>
                <Helmet
                    title="Готовые новости" />

                <Header />
                <Wrap>
                    <Content />
                </Wrap>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadyPage)
