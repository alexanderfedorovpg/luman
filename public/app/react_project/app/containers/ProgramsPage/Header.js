import React from 'react';
import PropTypes from 'prop-types';
import { Bot, Left, Right } from 'components/Header';
import Tabs from 'components/Tabs';

import { filters } from './constants';

const Header = ({ filter, setFilter, moved }) => {
    const active = (filters.find((item) => item.value === filter) || {}).title;

    return (
        <Bot moved={moved}>
            <Left>
                <Tabs data={filters} onClick={setFilter} active={active} />
            </Left>
            <Right>

            </Right>
        </Bot>
    );
};

Header.defaultProps = {
    filter: filters[0].value,
};

Header.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
    moved: PropTypes.bool,
};

export default Header;
