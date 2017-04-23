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
                    <Content rowClickCallback={this.props.setFilter}/>
                    <Users />
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
        setFilter(filter) {
            alert(`GOTO: ${filter}`)
            console.log(arguments, dispatch)
            //dispatch(push('/some/page'));
         //   dispatch(setFilter(filter.value));
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
