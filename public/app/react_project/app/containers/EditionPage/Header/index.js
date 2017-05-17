import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import {
    Bot,
    Left,
} from 'components/Header';
import { Root as Tabs, itemStyle } from 'components/Tabs';
import { selectMenuExpandedStatus } from 'containers/App/selectors';
import { tabs } from '../constants';

const StyledLink = styled(({ active, ...rest }) => <Link {...rest} />)`
    ${itemStyle}
`;

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderLink = this.renderLink.bind(this);
    }

    renderLink(link) {
        const { router } = this.props;
        return (
            <StyledLink key={link.href} to={link.href} active={router.isActive(link.href)}>
                {link.label}
            </StyledLink>
        );
    }

    render() {
        const { menuOpen } = this.props;

        return (
            <Bot moved={menuOpen}>
                <Left>
                    <Tabs>
                        {tabs.map(this.renderLink)}
                    </Tabs>
                </Left>
            </Bot>
        );
    }
}

Header.propTypes = {
    router: PropTypes.object,
    menuOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    menuOpen: selectMenuExpandedStatus,
});

export default withRouter(connect(mapStateToProps)(Header));
