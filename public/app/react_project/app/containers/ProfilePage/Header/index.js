import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    Bot,
    Left,
} from 'components/Header';
import Tabs from 'components/Tabs';
import { selectMenuExpandedStatus } from 'containers/App/selectors';
import { makeSelectedTab } from '../selectors';
import { tabs } from '../constants';
import { changeTab } from '../actions';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.PureComponent {
    render() {
        const { menuOpen, selectedTab } = this.props;
        const active = (tabs.find((item) => item.value === selectedTab) || {}).title;

        return (
            <Bot moved={menuOpen}>
                <Left>
                    <Tabs
                        data={tabs}
                        active={active}
                        onClick={this.props.changeTab}
                    />
                </Left>
            </Bot>
        );
    }
}

Header.propTypes = {
    selectedTab: PropTypes.string,
    menuOpen: PropTypes.bool,
    changeTab: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    menuOpen: selectMenuExpandedStatus,
    selectedTab: makeSelectedTab(),
});

export default connect(mapStateToProps, { changeTab })(Header);
