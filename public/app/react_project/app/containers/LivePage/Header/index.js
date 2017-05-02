import React from 'react';
import PropTypes from 'prop-types';
import { Bot, Left, Title } from 'components/Header';
import Icon from 'components/Icon';

const Header = ({ moved, live }) => (
    <Bot moved={moved}>
        <Left>
            <Icon type={`live-${live ? 'on' : 'off'}`} />
            <Title>Прямой эфир</Title>
        </Left>
    </Bot>
);

Header.propTypes = {
    live: PropTypes.bool,
    moved: PropTypes.bool,
};

export default Header;
