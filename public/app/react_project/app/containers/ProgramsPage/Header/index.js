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
import {
    ArrowDown,
    Check,
} from 'components/Icon/svg';
import { selectMenuExpandedStatus } from 'containers/App/selectors';

import {
    setRecordsType,
    openModal,
    searchRecord,
} from '../actions';
import { recordsTypes, MODALS } from '../constants';
import makeSelectProgramsPage from '../selectors';
import { Buttons, StyledBtn, Search } from './style';

class Header extends React.PureComponent {
    constructor(props) {
        super(props);

        this.searchRecords = debounce(props.search, 300);
        this.openAddRecordModal = this.openAddRecordModal.bind(this);
    }

    openAddRecordModal() {
        this.props.openModal(MODALS.record);
    }

    render() {
        const { recordsType } = this.props.ProgramsPage;
        const active = (recordsTypes.find((item) => item.value === recordsType) || {}).title;
        const { menuOpen } = this.props;

        return (
            <Bot moved={menuOpen}>
                <Left>
                    <Tabs
                        data={recordsTypes}
                        onClick={this.props.setRecordsType}
                        active={active}
                    />
                    <Buttons>
                        <StyledBtn md primary onClick={this.openAddRecordModal}>
                            <ArrowDown className="programs-icon" width="12px" height="14px" /> Загрузить
                        </StyledBtn>
                        <StyledBtn md success>
                            <Check className="programs-icon" width="12px" height="12px" /> Сохранить
                        </StyledBtn>
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
    ProgramsPage: PropTypes.object,
    openModal: PropTypes.func,
    onSave: PropTypes.func,
    setRecordsType: PropTypes.func,
    search: PropTypes.func,
    menuOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    menuOpen: selectMenuExpandedStatus,
});

function mapDispatchToProps(dispatch) {
    return {
        setRecordsType: (type) => dispatch(setRecordsType(type.value)),
        openModal: (modal) => dispatch(openModal(modal)),
        search: (query) => dispatch(searchRecord(query)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
