import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { History as Wrapper, HistoryTable, MoreLink } from '../style';
import { getLastActions } from '../actions';
import { lastActionsMap, LAST_ACTIONS_UPLOAD_NUM } from '../constants';
import {
    makeLastActions,
    makeGetAllHistoryLoaded,
} from '../selectors';

const historyHeader = lastActionsMap.map((item) => item.label);
let sortState = {
    sortDirection: null,
    sortIndex: null,
};

class History extends PureComponent {
    constructor(props) {
        super(props);

        this.onMoreLinkClick = this.onMoreLinkClick.bind(this);
    }

    componentDidMount() {
        if (this.props.lastActions.length) {
            return;
        }

        this.props.getLastActions();
    }

    onSort(sort) {
        sortState = sort;
    }

    onMoreLinkClick(e) {
        e.preventDefault();
        this.props.getLastActions();
    }

    render() {
        const { lastActions, allActionsLoaded } = this.props;

        return (
            <Wrapper>
                <Helmet
                    title="Последние действия пользователя"
                />
                <HistoryTable
                    {...sortState}
                    header={historyHeader}
                    body={lastActions}
                    onSort={this.onSort}
                    sortable
                />
                {
                    !allActionsLoaded &&
                    (
                        <MoreLink href="#" onClick={this.onMoreLinkClick}>
                            Показать еще {LAST_ACTIONS_UPLOAD_NUM} записей
                        </MoreLink>
                    )
                }
            </Wrapper>
        );
    }
}

History.propTypes = {
    lastActions: PropTypes.array,
    allActionsLoaded: PropTypes.bool,
    getLastActions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    lastActions: makeLastActions(),
    allActionsLoaded: makeGetAllHistoryLoaded(),
});

export default connect(mapStateToProps, { getLastActions })(History);
