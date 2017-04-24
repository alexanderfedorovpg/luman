import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { Content, Users, Wrap, Header } from '../../components/Stats'
import Dynamic from '../../components/Dynamic'


class StatsPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика" />

                <Header />
                <Wrap>
                    <Content rowClickCallback={this.props.categoryRowClickCallback} />
                    <Users rowClickCallback={this.props.userRowClickCallback}/>
                </Wrap>
                <Dynamic />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({

});

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

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
