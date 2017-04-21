import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';
import Item from '../Item';

// eslint-disable-next-line react/prefer-stateless-function
class LiveList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    toLiveClick(e, id) {
        e.preventDefault();

        if (!this.props.toLive) {
            return;
        }

        this.props.toLive(id);
    }

    renderItem({ id, ...props }) {
        return (
            <Item
                key={id}
                {...props}
                toLiveClick={(e) => this.toLiveClick(e, id)}
            />
        );
    }

    render() {
        return (
            <Wrapper>
                {this.props.items.map(this.renderItem)}
            </Wrapper>
        );
    }
}

LiveList.propTypes = {
    toLive: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        ...Item.propTypes,
        id: PropTypes.number.isRequired,
    })),
};

export default LiveList;
