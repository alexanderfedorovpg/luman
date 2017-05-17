import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Wrapper, StyledTable, LeftColumn, RightColumn } from '../style';
import { usersTableHeader } from '../constants';
import {
    makeGetUsers,
    makeRadioButtonsFromGroups,
} from '../selectors';
import NewUserForm from './NewUserForm';

const Users = ({ users, groups }) => (
    <Wrapper>
        <LeftColumn>
            <StyledTable
                header={usersTableHeader}
                body={users}
                columnsWidth={['45%', '35%']}
            />
        </LeftColumn>
        <RightColumn>
            <NewUserForm groups={groups} />
        </RightColumn>
    </Wrapper>
);

const mapStateToProps = createStructuredSelector({
    users: makeGetUsers(),
    groups: makeRadioButtonsFromGroups(),
});

export default connect(mapStateToProps)(Users);
