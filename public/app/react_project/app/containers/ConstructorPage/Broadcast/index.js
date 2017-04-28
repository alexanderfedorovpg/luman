import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Records from 'components/Constructor/Records'

import {
    searchRecord
} from 'containers/ProgramsPage/actions'

import {
    itemToMain
} from '../actions'

import {
    selectRecords
} from 'containers/ProgramsPage/selectors';

import {
    selectFilters
} from '../selectors'

export class Broadcast extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadRecords({ search: this.props.filters.search })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filters.search !== nextProps.filters.search) {
            this.props.loadRecords({ search: nextProps.filters.search })
        }
    }

    render() {
        let {
            records,
            toMain
        } = this.props

        return (
            <Records data={records} toMain={toMain} />
        )
    }

}

Broadcast.propTypes = {
};

const mapStateToProps = state => ({
    records: selectRecords(state),
    filters: selectFilters(state)
})

const mapDispatchToProps = dispatch => ({
    loadRecords(params) {
        dispatch(searchRecord(params.search))
    },
    toMain(item, category) {
        dispatch(itemToMain(item, 'broadcast', category))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Broadcast);
