/**
*
* Records
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Item from './Item';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

// eslint-disable-next-line react/prefer-stateless-function
class Records extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    onEdit(e, id) {
        this.callAction('onRecordEdit', e, id);
    }

    onDelete(e, id) {
        this.callAction('onRecordDelete', e, id);
    }

    onPreviewClick(e, id) {
        this.callAction('onPreviewClick', e, id);
    }

    callAction(actionName, e, id) {
        e.preventDefault();

        if (!this.props[actionName]) {
            return;
        }

        this.props[actionName](id);
    }

    renderItem({ id, ...props }) {
        const canEdit = !!this.props.onRecordEdit;
        const canDelete = !!this.props.onRecordDelete;

        return (
            <Item
                key={id}
                {...props}
                onPreviewClick={(e) => { this.onPreviewClick(e, id); }}
                onDelete={canDelete ? (e) => { this.onDelete(e, id); } : null}
                onEdit={canEdit ? (e) => { this.onEdit(e, id); } : null}
            />
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

Records.defaultProps = {
    items: [],
};

Records.propTypes = {
    onRecordDelete: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    onRecordEdit: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    onPreviewClick: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    items: PropTypes.arrayOf(PropTypes.shape({
        ...Item.propTypes,
        id: PropTypes.number.isRequired,
    })),
};

export default Records;
