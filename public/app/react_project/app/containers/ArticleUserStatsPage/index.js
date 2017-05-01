import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import ArticlesCategoriesList from '../../components/ArticleUserStats/index'
import {Header} from '../../components/Stats'
import styled from 'styled-components'
import {Wrap} from 'components/ArticleUserStats/index'


const TodayStatsLisk = styled.a`
    letter-spacing: -1.17px;
    text-decoration: none;
    cursor: pointer;    c
    color: #369;
    font-weight: 400;
 `


class ArticleUserStatsPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.params.type);
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика"/>
                <Header href="javascript:void()" />
                <Wrap>
                    <ArticlesCategoriesList/>
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

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleUserStatsPage);
