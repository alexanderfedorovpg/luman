import React from 'react';
import PropTypes from 'prop-types';
import { Bot, Left, Title } from 'components/Header';

const Header = ({ moved }) => (
    <Bot moved={moved}>
        <Left>
            <Title>Прямой эфир</Title>
        </Left>
    </Bot>
);

Header.propTypes = {
    moved: PropTypes.bool,
};

export default Header;
