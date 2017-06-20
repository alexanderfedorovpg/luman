import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import Info from 'components/InfoPage';
import {
    makeSelectHomeNewsByCategory,
} from 'selectors/news';

class InfoPage extends PureComponent {

    render() {
        const {homeNow} = this.props;
        const now = homeNow.map(v => v.news);
        return (
            <div>
                <Helmet title="Инфоблок" />
                <Info now={now} />
            </div>
        )
    }

}
const selectHomeNow = makeSelectHomeNewsByCategory(1);

const mapStateToProps = state => ({
    homeNow: selectHomeNow(state),
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage)