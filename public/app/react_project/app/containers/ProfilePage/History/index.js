import { connect } from 'react-redux';
import Journal from 'components/Journal';
import { getLastActions } from '../actions';
import { lastActionsMap } from '../constants';
import {
    makeLastActions,
    makeGetAllHistoryLoaded,
} from '../selectors';

const header = lastActionsMap.map((item) => item.label);
let sortState = {
    sortDirection: null,
    sortIndex: null,
};

const mapStateToProps = (state) => ({
    header,
    history: makeLastActions()(state),
    allHistoryLoaded: makeGetAllHistoryLoaded()(state),
    sort: sortState,
});

const mapDispatchToProps = (dispatch) => ({
    onSort: (sort) => { sortState = sort; },
    getHistory: () => dispatch(getLastActions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
