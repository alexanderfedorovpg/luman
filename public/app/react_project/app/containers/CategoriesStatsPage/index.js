import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import CategoriesList from 'components/CategoriesStats/index'
import {Content, Users, Wrap, Header} from '../../components/Stats'
import styled from 'styled-components'
import {
    loadCategoriesPageStatslist,
    changeCategoryName
} from './actions'

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
        this.props.onCategoryChange(this.props.params.type)
        this.props.loadPage();
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика"/>
                <Header href="javascript:void()"/>
                <Wrap>
                    <CategoriesList/>
                </Wrap>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({});

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
        loadPage(){
            dispatch(loadCategoriesPageStatslist());
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesStatsPage);
