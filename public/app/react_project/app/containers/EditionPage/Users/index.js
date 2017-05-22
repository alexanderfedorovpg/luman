import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ConfirmModal from 'components/Modal/ConfirmModal';

import { Wrapper, StyledTable, LeftColumn, RightColumn } from '../style';
import { usersTableHeader } from '../constants';
import {
    addUser,
    selectUser,
    deselectUser,
    deleteUser,
    editUser,
} from '../actions';
import {
    makeGetUsers,
    makeRadioButtonsFromGroups,
    makeSelectedUser,
    makeUserInfo,
    makeUserAccount,
} from '../selectors';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';

class Users extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            deleteModalOpen: false,
        };

        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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

    deleteUser() {
        this.props.deleteUser(this.props.selected);
        this.closeDeleteModal();
    }

    render() {
        const {
            users,
            groups,
            selected,
            userInfo,
            userAccount,
        } = this.props;

        return (
            <Wrapper>
                <LeftColumn>
                    <StyledTable
                        header={usersTableHeader}
                        body={users}
                        onRowClick={this.props.selectUser}
                        columnsWidth={['45%', '35%']}
                    />
                </LeftColumn>
                <RightColumn>
                    {
                        selected ?
                            (
                                <EditUserForm
                                    user={userInfo}
                                    initialValues={userAccount}
                                    groups={groups}
                                    onClose={this.props.deselectUser}
                                    onDelete={this.openDeleteModal}
                                    onEdit={this.props.editUser}
                                />
                            ) :
                            (
                                <NewUserForm
                                    groups={groups}
                                    addUser={this.props.addUser}
                                />
                            )
                    }
                </RightColumn>
                <ConfirmModal
                    isOpen={this.state.deleteModalOpen}
                    onClose={this.closeDeleteModal}
                    title="Вы уверены, что хотите удалить этого пользователя? Это действие невозможно будет отменить."
                    onConfirm={this.deleteUser}
                />
            </Wrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    users: makeGetUsers(),
    groups: makeRadioButtonsFromGroups(),
    selected: makeSelectedUser(),
    userInfo: makeUserInfo(),
    userAccount: makeUserAccount(),
});

const mapDispatchToProps = (dispatch) => ({
    addUser: (data) => dispatch(addUser(data)),
    selectUser: (data) => dispatch(selectUser(data.id)),
    deselectUser: () => dispatch(deselectUser()),
    deleteUser: (id) => dispatch(deleteUser(id)),
    editUser: (id, data) => dispatch(editUser(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
