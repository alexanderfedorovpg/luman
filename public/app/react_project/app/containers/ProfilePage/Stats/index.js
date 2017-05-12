import React from 'react';
import PropTypes from 'prop-types';
import {
    Wrapper,
    Item,
    Name,
    Value,
} from './style';

function renderItem(item) {
    return (
        <Item key={item.key}>
            <Name>{item.name}</Name>
            <Value>{item.value}</Value>
        </Item>
    );
}

const Stats = ({ items }) => (
    <Wrapper>
        {items.map(renderItem)}
    </Wrapper>
);

Stats.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.any,
    })),
};

export default Stats;
