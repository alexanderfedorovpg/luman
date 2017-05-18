import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Wrapper, StyledTable, LeftColumn, RightColumn } from '../style';
import { usersTableHeader } from '../constants';
import { addUser } from '../actions';
import {
    makeGetUsers,
    makeRadioButtonsFromGroups,
    makeSelected,
    makeUserInfo,
    makeUserAccount,
} from '../selectors';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';

const Users = ({
    users,
    groups,
    addUser,
    selected,
    userInfo,
    userAccount,
}) => (
    <Wrapper>
        <LeftColumn>
            <StyledTable
                header={usersTableHeader}
                body={users}
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
                        />
                    ) :
                    (
                        <NewUserForm
                            groups={groups}
                            addUser={addUser}
                        />
                    )
            }
        </RightColumn>
    </Wrapper>
);

const mapStateToProps = createStructuredSelector({
    users: makeGetUsers(),
    groups: makeRadioButtonsFromGroups(),
    selected: makeSelected(),
    userInfo: makeUserInfo(),
    userAccount: makeUserAccount(),
});

export default connect(mapStateToProps, { addUser })(Users);
