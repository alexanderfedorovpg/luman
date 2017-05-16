/**
*
* InlineFilter
*
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Item } from './style';

class InlineFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    onItemClick(e, value) {
        e.preventDefault();

        const { onChange } = this.props;

        if (!onChange) {
            return;
        }

        onChange(value);
    }

    renderItem(item) {
        const { value, role } = this.props;
        const active = value.indexOf(item.value) !== -1;

        return (
            <Item
                role={role}
                aria-checked={active}
                key={item.value}
                value={item.value}
                active={active}
                onClick={(e) => { this.onItemClick(e, item.value); }}
            >
                {item.label}
            </Item>
        );
    }

    render() {
        const { items } = this.props;

        return (
            <Wrapper>
                {items.map(this.renderItem)}
            </Wrapper>
        );
    }
}

InlineFilter.defaultProps = {
    items: [],
    value: [],
    role: 'radio',
};

InlineFilter.propTypes = {
    role: PropTypes.oneOf(['radio', 'checkbox']),
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
    })),
    value: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    onChange: PropTypes.func,
};

export default InlineFilter;
