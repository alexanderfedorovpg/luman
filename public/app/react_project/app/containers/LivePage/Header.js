import React from 'react';
import PropTypes from 'prop-types';
import { Bot, Left, Title } from 'components/Header';
import Icon from 'components/Icon';

const Header = ({ moved }) => (
    <Bot moved={moved}>
        <Left>
            <Icon type="live-on" />
            <Title>Прямой эфир</Title>
        </Left>
    </Bot>
);

Header.propTypes = {
    moved: PropTypes.bool,
};

export default Header;
