import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ConfirmModal from 'components/Modal/ConfirmModal';
import { loadGroups } from 'containers/App/actions';

import { Wrapper, StyledTable, LeftColumn, RightColumn } from '../style';
import { groupsTableHeader } from '../constants';
import {
    addGroup,
    selectGroup,
    deselectGroup,
    deleteGroup,
    editGroup,
    getPermissions,
} from '../actions';
import {
    makeGetGroupsTable,
    makeCheckboxesFromPermissions,
    makeSelectedGroup,
    makeGroupInfo,
    makeGroupAccount,
} from '../selectors';
import NewGroupForm from './NewGroupForm';
import EditGroupForm from './EditGroupForm';

class Groups extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            deleteModalOpen: false,
        };

        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
    }

    componentDidMount() {
        this.props.loadGroups();

        if (this.props.permissions.length) {
            return;
        }

        this.props.getPermissions();
    }

    closeDeleteModal() {
        this.setState({
            deleteModalOpen: false,
        });
    }

    openDeleteModal() {
        this.setState({
            deleteModalOpen: true,
        });
    }

    deleteGroup() {
        this.props.deleteGroup(this.props.selected);
        this.closeDeleteModal();
    }

    render() {
        const {
            users,
            permissions,
            selected,
            groupInfo,
            groupAccount,
        } = this.props;

        return (
            <Wrapper>
                <LeftColumn>
                    <StyledTable
                        header={groupsTableHeader}
                        body={users}
                        onRowClick={this.props.selectGroup}
                        columnsWidth={['45%', '35%']}
                    />
                </LeftColumn>
                <RightColumn>
                    {
                        selected ?
                            (
                                <EditGroupForm
                                    user={groupInfo}
                                    initialValues={groupAccount}
                                    permissions={permissions}
                                    onClose={this.props.deselectGroup}
                                    onDelete={this.openDeleteModal}
                                    onEdit={this.props.editGroup}
                                />
                            ) :
                            (
                                <NewGroupForm
                                    permissions={permissions}
                                    addGroup={this.props.addGroup}
                                />
                            )
                    }
                </RightColumn>
                <ConfirmModal
                    isOpen={this.state.deleteModalOpen}
                    onClose={this.closeDeleteModal}
                    title="Вы уверены, что хотите удалить эту группу? Это действие невозможно будет отменить."
                    onConfirm={this.deleteGroup}
                />
            </Wrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    users: makeGetGroupsTable(),
    permissions: makeCheckboxesFromPermissions(),
    selected: makeSelectedGroup(),
    groupInfo: makeGroupInfo(),
    groupAccount: makeGroupAccount(),
});

const mapDispatchToProps = (dispatch) => ({
    addGroup: (data) => dispatch(addGroup(data)),
    selectGroup: (data) => dispatch(selectGroup(data.id)),
    deselectGroup: () => dispatch(deselectGroup()),
    deleteGroup: (id) => dispatch(deleteGroup(id)),
    editGroup: (id, data) => dispatch(editGroup(id, data)),
    getPermissions: () => dispatch(getPermissions()),
    loadGroups: () => dispatch(loadGroups()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
