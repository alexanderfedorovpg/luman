import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import AuthorsStatsStats from 'components/ArticleUserStats/index'
import {Content, Users, Wrap, Header} from '../../components/Stats'
import styled from 'styled-components'
import {
    loadAuthorsPageStatslist,
    changeAuthorId
} from './actions'
import {
    selectAuthorStatsPageData,
} from './selectors'


const TodayStatsLisk = styled.a`
    letter-spacing: -1.17px;
    text-decoration: none;
    cursor: pointer;    c
    olor: #369;
    font-weight: 400;
 `


class CategoriesStatsPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPage(this.props.params.type);
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика"/>
                <Header href="javascript:void()"/>
                <Wrap>
                    {<AuthorsStatsStats data={this.props.data}/>}
                </Wrap>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    data: selectAuthorStatsPageData(state),
});
function mapDispatchToProps(dispatch) {

    return {
        categoryRowClickCallback(categoryName) {
            dispatch(push(`categoriesStatsPage/${categoryName}`));
        },
        userRowClickCallback(userId) {
            dispatch(push(`articleUserStatsPage/${userId}`));
        },
        onCategoryChange: (category) => {
            dispatch(changeCategoryName(category));
        },
        loadPage(category) {
            dispatch(loadAuthorsPageStatslist(category));
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesStatsPage);
