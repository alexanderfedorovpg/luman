import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeProfileStats } from '../selectors';
import { Profile } from '../style';
import AccountForm from './AccountForm';
import Stats from './Stats';

const Account = ({ stats }) => (
    <Profile>
        <AccountForm />
        <Stats items={stats} />
    </Profile>
);

Account.propTypes = {
    stats: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
    stats: makeProfileStats(),
});

export default connect(mapStateToProps)(Account);
