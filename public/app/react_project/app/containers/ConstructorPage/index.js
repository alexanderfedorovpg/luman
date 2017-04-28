import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Constructor/Header';

import {
    loadCategories,
    loadHomeNews,
    cancelChanges,
    removeFromMain,
    setFilter,
    saveChanges
} from './actions'

import {
    loadPrograms
} from 'containers/ProgramsPage/actions'

import {
    selectCategories,
    selectWarMode
} from './selectors';

import {
    selectMenuExpandedStatus
} from 'containers/App/selectors';


export class ConstructorPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadNewslist()
        this.props.loadCategories()
        this.props.loadPrograms()
    }

    render() {
        let {
            war,
            menuOpen,
            cancelChanges,
            setFilter,
            saveChanges
        } = this.props;

        return (
            <div className={war ? 'war-mode' : ''}>

                <Helmet title="Конструтор" />

                <Header
                    onSave={saveChanges}
                    moved={menuOpen}
                    onCancel={cancelChanges}
                    onFilterChange={setFilter} />

                {this.props.children}
            </div>
        )
    }
}

ConstructorPage.propTypes = {
    loadCategories: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    menuOpen: selectMenuExpandedStatus(state),
    categories: selectCategories(state),
    war: selectWarMode(state),
})

const mapDispatchToProps = dispatch => ({
    saveChanges() {
        dispatch(saveChanges());
    },
    setFilter(filters) {
        dispatch(setFilter(filters));
    },
    loadCategories() {
        dispatch(loadCategories())
    },
    loadNewslist() {
        dispatch(loadHomeNews())
    },
    loadPrograms() {
        dispatch(loadPrograms())
    },
    cancelChanges() {
        dispatch(cancelChanges())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorPage);
