import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bot, Left, Right } from 'components/Header';
import Tabs from 'components/Tabs';
import {
    Horizontal as FormHorizontal,
    InputIcon,
} from 'components/Form';
import { rem } from 'utils/style';
import { filters } from './constants';

const Search = styled(InputIcon)`
    width: ${rem(465)};
`;

const Header = ({ filter, setFilter, moved }) => {
    const active = (filters.find((item) => item.value === filter) || {}).title;

    return (
        <Bot moved={moved}>
            <Left>
                <Tabs data={filters} onClick={setFilter} active={active} />
            </Left>
            <Right>
                <FormHorizontal>
                    <Search
                        placeholder="Поиск по программам"
                        block
                        icon="search"
                    />
                </FormHorizontal>
            </Right>
        </Bot>
    );
};

Header.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
    moved: PropTypes.bool,
};

export default Header;
