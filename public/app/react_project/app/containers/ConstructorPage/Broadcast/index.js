import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Wrap, Left, Right } from 'components/Constructor/Content';
import Records from 'components/Constructor/Records';
import Tabs from 'components/Constructor/Tabs';

import {
    makeGetProgramsArray,
} from 'containers/App/selectors';

import Collapse from '../Collapse';
import {
    itemToMain,
    removeFromMain,
    loadItems,
    removeFromConstructor,
} from '../actions';
import {
    selectRecords,
    selectFilters,
} from '../selectors';

export class Broadcast extends PureComponent {
    componentDidMount() {
        this.props.loadRecords();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filters.search !== nextProps.filters.search) {
            this.props.loadRecords();
        }
    }

    render() {
        let {
            records,
            toMain,
            programs,
            removeFromMain,
            removeFromConstructor,
        } = this.props;

        return (
            <Wrap>
                <Left>
                    <Tabs />
                    <Records
                        onRemove={removeFromConstructor}
                        data={records}
                        toMain={toMain}
                    />
                </Left>
                <Right>
                    <Collapse
                        type={'broadcast'}
                        onRemove={removeFromMain}
                        categories={programs}
                    />
                </Right>
            </Wrap>
        );
    }

}

Broadcast.propTypes = {
};

const mapStateToProps = (state) => ({
    records: selectRecords(state),
    programs: makeGetProgramsArray()(state),
    filters: selectFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadRecords() {
        dispatch(loadItems('records'));
    },
    toMain(item, category, before) {
        dispatch(itemToMain(item, 'broadcast', category, before));
    },
    removeFromMain(item) {
        dispatch(removeFromMain(item, 'broadcast'));
    },
    removeFromConstructor({ id }) {
        dispatch(removeFromConstructor(id, 'records'));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Broadcast);
