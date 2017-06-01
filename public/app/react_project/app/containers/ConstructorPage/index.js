import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Constructor/Header';
import Modal from './Preview/Modal';
import PreviewDefault from './Preview/Default';
import PreviewWar from './Preview/War';

import {
    loadPrograms
} from 'containers/App/actions'

import {
    loadCategories,
    loadOnline,
    loadHomeNews,
    cancelChanges,
    removeFromMain,
    setFilter,
    saveChanges
} from './actions'

import {
    selectCategories,
    selectWarMode,
    selectPristine,
    selectHomeNews,
    selectOnline,
} from './selectors';

import {
    selectMenuExpandedStatus
} from 'containers/App/selectors';


export class ConstructorPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            previewOpen: false
        }

        this.openPreview = ::this.openPreview
        this.closePreview = ::this.closePreview
    }

    componentDidMount() {
        this.props.loadOnline()
        this.props.loadNewslist()
        this.props.loadCategories()
        this.props.loadPrograms({constructor: true})
    }

    openPreview() {
        this.setState({
            previewOpen: true
        })
    }

    closePreview() {
        this.setState({
            previewOpen: false
        })
    }

    render() {
        let {
            war,
            menuOpen,
            cancelChanges,
            setFilter,
            saveChanges,
            pristine,
            home,
            online
        } = this.props;

        return (
            <div className={war ? 'war-mode' : ''}>

                <Helmet title="Конструктор" />

                <Header
                    pristine={pristine}
                    onSave={saveChanges}
                    moved={menuOpen}
                    onPreview={this.openPreview}
                    onCancel={cancelChanges}
                    onFilterChange={setFilter} />

                {this.props.children}

                <Modal
                    contentLabel="Предпросмотр"
                    isOpen={this.state.previewOpen}
                    onRequestClose={this.closePreview}>

                    {war
                        ? <PreviewWar data={home} online={online.toJS()} />
                        : <PreviewDefault data={home} />
                    }
                </Modal>
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
    pristine: selectPristine(state),
    home: selectHomeNews(state),
    online: selectOnline(state),
})

const mapDispatchToProps = dispatch => ({
    saveChanges() {
        dispatch(saveChanges());
    },
    setFilter(filters) {
        dispatch(setFilter(filters));
    },
    loadOnline() {
        dispatch(loadOnline())
    },
    loadCategories() {
        dispatch(loadCategories())
    },
    loadNewslist() {
        dispatch(loadHomeNews())
    },
    loadPrograms(params) {
        dispatch(loadPrograms(params))
    },
    cancelChanges() {
        dispatch(cancelChanges())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorPage);
