import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { Wrap, Left, Right } from 'components/Constructor/Content'
import Header from 'components/Constructor/Header';
import News from 'components/Constructor/News';
import Tabs from 'components/Constructor/News/Tabs';
import Collapse from 'components/Constructor/Collapse';

import {
    loadCategories,
    loadHomeNews,
    chooseCategory,
    cancelChanges,
    removeFromMain,
    setFilter,
    setWarMode,
    saveChanges
} from './actions'

import {
    loadPrograms
} from 'containers/ProgramsPage/actions'

import {
    selectHomeNews,
    selectCategories,
    selectWarMode
} from './selectors';

import {
    makeGetPrograms
} from 'containers/ProgramsPage/selectors'

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

    getCategories(type) {
        switch (type) {
            case 'news':
                return this.props.categories

            case 'noise':
                return [{
                    id: 1,
                    name: 'Инфошум'
                }]

            case 'broadcast':
                return this.props.programs

            default:
                return []
        }
    }

    render() {
        let {
            news,
            menuOpen,
            categories,
            location,
            chooseCategory,
            removeFromMain,
            cancelChanges,
            setFilter,
            war,
            setWarMode,
            saveChanges
        } = this.props;

        const active = location.pathname.split('/').pop()

        return (
            <div className={war ? 'war-mode' : ''}>

                <Helmet title="Конструтор" />

                <Header
                    onSave={saveChanges}
                    moved={menuOpen}
                    onCancel={cancelChanges}
                    onFilterChange={setFilter} />

                <Wrap>
                    <Left>
                        <Tabs />
                        {this.props.children}
                    </Left>
                    <Right>
                        <Collapse
                            war={war}
                            onWarModeChange={setWarMode}
                            active={active}
                            choose={chooseCategory}
                            onRemove={removeFromMain(active)}
                            categories={this.getCategories(active)}
                            data={news} />
                    </Right>
                </Wrap>
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
    news: selectHomeNews(state),
    programs: makeGetPrograms()(state),
    war: selectWarMode(state)
})

const mapDispatchToProps = dispatch => ({
    saveChanges() {
        dispatch(saveChanges());
    },
    setFilter(filters) {
        dispatch(setFilter(filters));
    },
    setWarMode(value) {
        dispatch(setWarMode(value));
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
    chooseCategory(category) {
        dispatch(chooseCategory(category))
    },
    cancelChanges() {
        dispatch(cancelChanges())
    },
    removeFromMain(type) {
        return item => dispatch(removeFromMain(item, type))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorPage);
