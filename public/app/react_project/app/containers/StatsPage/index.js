import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

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
                    <Content />
                    <Users />
                </Wrap>
                <Dynamic />
            </div>
        )
    }
}

export default StatsPage
