import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import Info from 'components/InfoPage';

class InfoPage extends PureComponent {

    render() {
        return (
            <div>
                <Helmet title="Инфоблок" />
                <Info />
            </div>
        )
    }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage)