import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import {
    Bot,
    Left,
    Right,
} from 'components/Header';
import Tabs from 'components/Tabs';
import {
    Horizontal as FormHorizontal,
} from 'components/Form';
import { selectMenuExpandedStatus } from 'containers/App/selectors';
import {
    setRecordsType,
    openModal,
    searchRecord,
    publishRecords,
} from '../actions';
import { recordsTypes, MODALS } from '../constants';
import { makeCheckCanSave, makeGetRecordsType } from '../selectors';
import { Buttons, StyledBtn, Search } from './style';

class Header extends React.PureComponent {
    constructor(props) {
        super(props);

        this.searchRecords = debounce(props.search, 300);
        this.openAddRecordModal = this.openAddRecordModal.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onSaveClick(e) {
        e.preventDefault();

        if (e.target.disabled) {
            return;
        }

        this.props.publishRecords();
    }

    openAddRecordModal() {
        this.props.openModal(MODALS.record);
    }

    render() {
        const { menuOpen, canSave, recordsType } = this.props;
        const activeType = (recordsTypes.find((item) => item.value === recordsType) || {}).title;

        return (
            <Bot moved={menuOpen}>
                <Left>
                    <Tabs
                        data={recordsTypes}
                        onClick={this.props.setRecordsType}
                        active={activeType}
                    />
                    <Buttons>
                        <StyledBtn md buttonType="upload" onClick={this.openAddRecordModal} />
                        <StyledBtn
                            md
                            buttonType="save"
                            active={canSave}
                            disabled={!canSave}
                            onClick={this.onSaveClick}
                        />
                    </Buttons>
                </Left>
                <Right>
                    <FormHorizontal>
                        <Search
                            placeholder="Поиск по программам"
                            block
                            onChange={(e) => this.searchRecords(e.target.value)}
                            icon="search"
                        />
                    </FormHorizontal>
                </Right>
            </Bot>
        );
    }
}

Header.propTypes = {
    recordsType: PropTypes.string,
    openModal: PropTypes.func,
    publishRecords: PropTypes.func,
    setRecordsType: PropTypes.func,
    search: PropTypes.func,
    canSave: PropTypes.bool,
    menuOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    recordsType: makeGetRecordsType(),
    menuOpen: selectMenuExpandedStatus,
    canSave: makeCheckCanSave(),
});

function mapDispatchToProps(dispatch) {
    return {
        setRecordsType: (type) => dispatch(setRecordsType(type.value)),
        openModal: (modal) => dispatch(openModal(modal)),
        search: (query) => dispatch(searchRecord(query)),
        publishRecords: () => dispatch(publishRecords()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
