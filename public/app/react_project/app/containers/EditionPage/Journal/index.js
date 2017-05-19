import { connect } from 'react-redux';
import Journal from 'components/Journal';
import { getHistory } from '../actions';
import { historyMap } from '../constants';
import {
    makeHistory,
    makeGetAllHistoryLoaded,
} from '../selectors';

const header = historyMap.map((item) => item.label);
let sortState = {
    sortDirection: null,
    sortIndex: null,
};

const mapStateToProps = (state) => ({
    header,
    history: makeHistory()(state),
    allHistoryLoaded: makeGetAllHistoryLoaded()(state),
    sort: sortState,
});

const mapDispatchToProps = (dispatch) => ({
    onSort: (sort) => { sortState = sort; },
    getHistory: () => dispatch(getHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
