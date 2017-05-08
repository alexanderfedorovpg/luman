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
                    />
                </Left>
            </Bot>
        );
    }
}

Header.propTypes = {
    selectedTab: PropTypes.string,
    menuOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    menuOpen: selectMenuExpandedStatus,
    selectedTab: makeSelectedTab(),
});

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
