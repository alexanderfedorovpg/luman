import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { Content, Users, Wrap, Header } from '../../components/Stats'

class StatsPage extends Component {

    render() {
        return (
            <div>
                <Helmet
                    title="Cтатистика" />

                <Header />
                <Wrap>
                    <Content />
                    <Users />
                </Wrap>
            </div>
        )
    }
}

export default StatsPage
