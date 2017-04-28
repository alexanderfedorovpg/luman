import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import {Content, Users, Wrap, Header} from '../../components/Stats'
import Dynamic from '../../components/Dynamic'
import categoriesStatsLoaded from "./actions"
import { List } from 'immutable'

import {
    loadCategoriesStatslist
} from './actions'

import {
    selectStatsData
} from './selectors'

class StatsPage extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
      this.props.loadList()
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика"/>
                <Header />
                <Wrap>
                    <Content rowClickCallback={this.props.categoryRowClickCallback} data={this.props.stats}/>
                    <Users rowClickCallback={this.props.userRowClickCallback}/>
                </Wrap>
                <Dynamic />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stats: selectStatsData(state)
});

function mapDispatchToProps(dispatch) {
    return {
        categoryRowClickCallback(categoryName) {
            dispatch(push(`categoriesStatsPage/${categoryName}`));
        },
        userRowClickCallback(userId) {
            dispatch(push(`articleUserStatsPage/${userId}`));
        },
        loadList() {
            dispatch(loadCategoriesStatslist())
        },


    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
