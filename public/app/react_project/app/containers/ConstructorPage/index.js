import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { Wrap, Left, Right } from 'components/Constructor/Content'
import Header from 'components/Constructor/Header';
import News from 'components/Constructor/News';
import Tabs from 'components/Constructor/News/Tabs';
import Collapse from 'components/Constructor/Collapse';

import {
} from './actions'

import {
    selectNewsList
} from './selectors';

import {
    selectEditors
} from 'containers/App/selectors';


export class ConstructorPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {
            news,
            menuOpen,
        } = this.props;

        return (
            <div>
                <Helmet title="Конструтор" />
                <Header moved={menuOpen} />
                <Wrap>
                    <Left>
                        <Tabs />
                        {this.props.children}
                    </Left>
                    <Right>
                        {/*<RightTabs data={filters} active={active} onClick={this.props.setFilter} />*/}
                        <Collapse tabs={[]} />
                    </Right>
                </Wrap>
            </div>
        )
    }

}

ConstructorPage.propTypes = {
    setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    menuOpen: state.get('app').get('menuOpen'),
    news: selectNewsList(state)
})

const mapDispatchToProps = dispatch => ({
    setFilter(filter) {
        dispatch(setFilter(filter));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorPage);
