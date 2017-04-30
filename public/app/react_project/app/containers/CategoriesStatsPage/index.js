import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import CategoriesList from 'components/CategoriesStats/index'
import {Content, Users, Wrap, Header} from '../../components/Stats'
import styled from 'styled-components'


const TodayStatsLisk = styled.a`
    background-color: transparent;
    color: rgb(51, 102, 153);
    font-weight: 400;
 `


class CategoriesStatsPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(CategoriesList);
        console.log(this.props.params.type);
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика"/>
                <Header />
            <Wrap>
                <TodayStatsLisk>Вся статистика за сегодня</TodayStatsLisk>
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

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesStatsPage);
