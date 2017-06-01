import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getFormValues } from 'redux-form/immutable'
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter'

import {
    selectUsersMap,
    selectCurrentUser,
    selectMenuExpandedStatus
} from 'containers/App/selectors'
import {
    selectNews,
    selectNewsData,
    selectComments,
    selectCommentsAction,
    selectCommentEdited
} from './selectors'

import {
    toggleOnline,
    loadOnline,
    loadComments,
    addComment,
    editComment,
    deleteComment,
    saveTitle,
    saveCover,
    setCommentsAction,
    setCommentEdit
} from './actions'

import { strings } from './constants'

import Header from 'components/Translation/Header'
import Detail from 'components/Translation/Detail'
import Content from 'components/Translation/Content'
import ConfirmDeleteModal from './ConfirmDeleteModal'

class TranslationPage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }

        this.submitHandler = ::this.submitHandler
        this.setEditAction = ::this.setEditAction
        this.setDeleteAction = ::this.setDeleteAction
        this.applyAction = ::this.applyAction
        this.openModal = ::this.openModal
        this.closeModal = ::this.closeModal
        this.turnOffOnline = ::this.turnOffOnline
    }

    componentDidMount() {

        this.props.fetchOnline()

        if (this.props.params.id) {
            this.fetchItem(this.props.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {

            if (nextProps.params.id) {
                this.fetchItem(nextProps.params.id)
            }
        }
    }

    // загружает новость, если ее нет в списке
    // также загружает "новости по теме"
    fetchItem(id) {
        if (!this.getById(id)) {
            this.props.fetchOnline(id)
        }
        this.props.fetchComments(id)
    }

    getById(id) {
        const { newsData } = this.props

        return newsData[id]
    }

    submitHandler() {
        const { formValues, params, edited } = this.props
        const values = formValues.toJS()
        const newsId = params.id

        if (!newsId) return

        if (edited) {
            this.props.editComment({
                id: edited.id,
                news_id: newsId,
                body: values.body
            })
        }
        else {
            values.body && this.props.addComment({
                news_id: newsId,
                body: values.body
            })
        }

        this.props.saveTitle({
            id: newsId,
            title: values.title
        })

        // File List имеет тип - объект
        if (typeof values.image == 'object') {
            this.props.saveCover({
                id: newsId,
                cover: values.image[0]
            })

        }
    }

    closeModal() {
        this.setState({
            ...this.state,
            modalOpen: false
        })
    }

    openModal() {
        this.setState({
            ...this.state,
            modalOpen: true
        })
    }

    applyAction(comment) {
        switch (this.props.commentsAction) {
            case 'delete':
                this.openModal()
                this.props.setCommentEdit(comment.id)

            case 'edit':
                this.props.setCommentEdit(comment.id)
        }

        this.props.setCommentsAction(null)
    }

    setEditAction() {
        this.props.setCommentsAction('edit')
        toastr.info(strings.chooseCommentForEdit)
    }

    setDeleteAction() {
        this.props.setCommentsAction('delete')
        toastr.info(strings.chooseCommentForDelete)
    }

    turnOffOnline() {
        const item = this.getById(this.props.params.id)

        if (!item) return

        this.props.toggleOnline(item.id)
    }

    render() {
        const {
            menuOpen,
            news,
            comments,
            params,
            submit,
            addComment,
            deleteComment,
            edited,

        } = this.props
        const item = this.getById(params.id) || {}

        return (
            <div>
                <Helmet
                    title="Текстовая трансляция" />

                {params.id
                    ? (
                        <div>
                            <Header
                                moved={menuOpen}
                                onDelete={this.setDeleteAction}
                                onEdit={this.setEditAction}
                                onTurnOff={this.turnOffOnline}
                                onSubmit={this.submitHandler} />
                            <Detail
                                data={item}
                                edited={edited}
                                comments={comments}
                                onCommentClick={this.applyAction} />
                        </div>
                    )
                    : <Content data={news} />
                }
                <ConfirmDeleteModal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}
                    onConfirm={() => {
                        deleteComment(edited.id)
                        this.closeModal()
                    }} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    menuOpen: selectMenuExpandedStatus(state),
    comments: selectComments(state),
    commentsAction: selectCommentsAction(state),
    edited: selectCommentEdited(state),
    news: selectNews(state),
    newsData: selectNewsData(state),
    formValues: getFormValues('translationForm')(state)
})

const mapDispatchToProps = dispatch => ({
    toggleOnline(id) {
        dispatch(toggleOnline(id))
    },
    fetchOnline(id) {
        dispatch(loadOnline(id))
    },
    fetchComments(id) {
        dispatch(loadComments(id))
    },
    addComment(params) {
        dispatch(addComment(params))
    },
    editComment(params) {
        dispatch(editComment(params))
    },
    deleteComment(id) {
        dispatch(deleteComment(id))
    },
    saveTitle(params) {
        dispatch(saveTitle(params))
    },
    saveCover(params) {
        dispatch(saveCover(params))
    },
    setCommentsAction(action) {
        dispatch(setCommentsAction(action))
    },
    setCommentEdit(id) {
        dispatch(setCommentEdit(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TranslationPage);
