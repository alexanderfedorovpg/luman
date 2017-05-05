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
import {
    selectCategoryPageStatsData,
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
        this.props.onCategoryChange(this.props.params.type)
        this.props.loadPage();
    }

    render() {
        return (
            <div>
                {console.log(this.props.data)}
                <Helmet
                    title="Cтатистика"/>
                <Header href="javascript:void()"/>
                <Wrap>
                    {/*<CategoriesList data={this.props.data}/>*/}
                </Wrap>
            </div>
        )
    }
}
const mapStateToProps = state => ({
   data: selectCategoryPageStatsData(state),
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
        loadPage(){
            dispatch(loadCategoriesPageStatslist());
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesStatsPage);
