import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';
import Item from '../Item';

// eslint-disable-next-line react/prefer-stateless-function
class NewsList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    onActionBtnClick(e, id) {
        e.preventDefault();

        if (!this.props.action) {
            return;
        }

        this.props.action(id);
    }

    renderItem({ id, ...props }) {
        return (
            <Item
                key={id}
                active={id === this.props.active}
                {...props}
                actionBtn={this.props.actionText}
                actionBtnClick={(e) => this.onActionBtnClick(e, id)}
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

NewsList.propTypes = {
    action: PropTypes.func,
    actionText: PropTypes.string,
    active: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
        ...Item.propTypes,
        id: PropTypes.number.isRequired,
    })),
};

export default NewsList;
