import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Wrap, Left, Right } from 'components/Constructor/Content'
import Records from 'components/Constructor/Records'
import Tabs from 'components/Constructor/Tabs'
import Collapse from '../Collapse'

import {
    searchRecord,
} from 'containers/ProgramsPage/actions'

import {
    itemToMain,
    removeFromMain,
} from '../actions'

import {
    selectRecords,
    makeGetPrograms
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
            toMain,
            programs,
            removeFromMain
        } = this.props

        return (
            <Wrap>
                <Left>
                    <Tabs />
                    <Records data={records} toMain={toMain} />
                </Left>
                <Right>
                    <Collapse
                        type={'broadcast'}
                        onRemove={removeFromMain}
                        categories={programs} />
                </Right>
            </Wrap>
        )
    }

}

Broadcast.propTypes = {
};

const mapStateToProps = state => ({
    records: selectRecords(state),
    filters: selectFilters(state),
    programs: makeGetPrograms()(state),
})

const mapDispatchToProps = dispatch => ({
    loadRecords(params) {
        dispatch(searchRecord(params.search))
    },
    toMain(item, category, before) {
        dispatch(itemToMain(item, 'broadcast', category, before))
    },
    removeFromMain(item) {
        dispatch(removeFromMain(item, 'broadcast'))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Broadcast);
