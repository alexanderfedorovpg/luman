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
    loadCategoriesStatslist,
    loadAuthorsList
} from './actions'

import {
    selectCategoryStatsData,
    selectAuthorsStatsData
} from './selectors'

class StatsPage extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
      this.props.loadCatsList();
      this.props.loadAuthorsList();
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика"/>
                <Header />
                <Wrap>
                    <Content rowClickCallback={this.props.categoryRowClickCallback} data={this.props.categoriesStats}/>
                    <Users rowClickCallback={this.props.userRowClickCallback}б data={this.props.authorsStats}/>
                </Wrap>
                {/*<Dynamic />*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categoriesStats: selectCategoryStatsData(state),
    authorsStats: selectAuthorsStatsData(state),
});

function mapDispatchToProps(dispatch) {
    return {
        categoryRowClickCallback(categoryName) {
            dispatch(push(`categoriesStatsPage/${categoryName}`));
        },
        userRowClickCallback(userId) {
            dispatch(push(`articleUserStatsPage/${userId}`));
        },
        loadCatsList() {
            dispatch(loadCategoriesStatslist())
        },
        loadAuthorsList(){
            dispatch(loadAuthorsList())
        }


    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
