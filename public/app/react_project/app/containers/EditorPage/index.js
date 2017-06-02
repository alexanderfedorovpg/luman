import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { submit, getFormValues, isValid } from 'redux-form/immutable'

import HeaderEditor from 'components/Editor/Header.editor'
import HeaderSupervisor from 'components/Editor/Header.supervisor'
import Content from 'components/Editor/Content'

import {
    clearArticle,
    loadArticle,
    deleteArticle,
    finishArticle,
    toFixArticle,
    publishArticle,
    delegateArticle,
    rejectArticle
} from './actions'

import { loadEditors } from 'containers/App/actions'

import {
    selectArticle
} from './selectors'
import { selectRubrics } from 'containers/App/selectors'

import {
    selectEditors,
    selectCurrentUser,
    selectMenuExpandedStatus
} from 'containers/App/selectors'

import { checkPermissons } from 'utils/permissons'

class EditorPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            preview: false
        }

        this.openPreview = ::this.openPreview
        this.closePreview = ::this.closePreview
        this.submitHandler = ::this.submitHandler
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.params.id !== nextProps.params.id) {

            nextProps.clearArticle()

            if (nextProps.params.id) {
                nextProps.loadArticle(nextProps.params.id)
            }
        }
    }

    componentDidMount() {
        const { article, params, loadArticle, clearArticle } = this.props

        // если имеющаяся в данный момент новость не та, которую мы
        // хотим видеть - убираем ее из состояния
        if (article && (article.id !== params.id)) {
            clearArticle()
        }

        if (params.id) {
            loadArticle(params.id)
        }
    }

    openPreview() {
        if (this.state.preview) return

        this.setState({
            preview: true
        })
    }

    closePreview() {
        if (!this.state.preview) return

        this.setState({
            preview: false
        })
    }

    submitHandler(cb) {
        return data => {
            const values = data.toJS()
            const { article, rubrics } = this.props;

            cb({
                id: article.id,
                top: values.top,
                title: values.title,
                sub_title: values.subtitle,
                editor_id: (values.editor||this.props.user).id,
                rubrics: values.rubrics,
                keywords: values.keywords.trim().replace(/ +/g, ','),
                theses: values.theses,
                image_main: typeof values.image_main === 'string'
                    ? (article.image_main||{}).id
                    : values.image_main[0],
                image_main_info: {
                    object_name: values.image_main_title,
                    object_author: values.image_main_author,
                    object_source: values.image_main_source,
                },
                image_preview: typeof values.image_preview === 'string'
                    ? (article.image_preview||{}).id
                    : values.image_preview[0],
                image_preview_info: {
                    object_name: values.image_preview_title,
                    object_author: values.image_preview_author,
                    object_source: values.image_preview_source,
                },
                body: values.body,
                video_stream: values.video.id || (values.video.file||[])[0],
                video_stream_preview: values.videoPreview.id || (values.videoPreview.file||[])[0],
                video_stream_preview_info: {
                    object_author: values.videoPreview.author,
                    object_source: values.videoPreview.source,
                },
            });
        }
    }

    renderContent() {
        let {
            menuOpen,
            article,
            rubrics,
            finishArticle,
            publishArticle,
            delegateArticle,
            deleteArticle,
            rejectArticle,
            toFixArticle,
            params,
            users,
            user,
            formIsValid,
            formValues,
        } = this.props

        const values = formValues && formValues.toJS()

        const headerProps = {
            moved: menuOpen,
            preview: this.openPreview,
            onSubmit: this.props.submit,
            reject: (article.id || formIsValid) && rejectArticle.bind(this, article.id||values)
        }

        if (article.id) {
            headerProps.del = deleteArticle.bind(this, article.id)
            headerProps.ret = toFixArticle.bind(this, article.id)
        }

        if (checkPermissons(user, ['admin', 'сommissioning-editor'])) {
            return (
                <div>
                    <HeaderSupervisor
                        {...headerProps} />

                    <Content
                        article={article}
                        formValues={this.props.formValues}
                        rubrics={rubrics}
                        chatRoom={params.id}
                        preview={this.state.preview}
                        delegate={delegateArticle}
                        closePreview={this.closePreview}
                        users={users.toJS()}
                        onSubmit={this.submitHandler(publishArticle)}
                        supervisor />
                </div>
            )
        }
        else if (checkPermissons(user, ['editor'])) {
            return (
                <div>
                    <HeaderEditor
                        {...headerProps} />

                    <Content
                        article={article}
                        formValues={this.props.formValues}
                        rubrics={rubrics}
                        chatRoom={params.id}
                        delegate={article.id && rejectArticle.bind(this, article.id)}
                        preview={this.state.preview}
                        onSubmit={this.submitHandler(finishArticle)}
                        closePreview={this.closePreview} />
                </div>
            )
        }
        else {
            return null
        }
    }

    render() {

        return (
            <div>
                <Helmet
                    title="Правки" />

                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    article: selectArticle(state),
    rubrics: selectRubrics(state),
    users: selectEditors(state),
    user: selectCurrentUser(state),
    menuOpen: selectMenuExpandedStatus(state),
    formIsValid: isValid('articleEditorForm')(state),
    formValues: getFormValues('articleEditorForm')(state)
})

const mapDispatchToProps = dispatch => ({
    submit() {
        dispatch(submit('articleEditorForm'))
    },
    clearArticle() {
        dispatch(clearArticle())
    },
    loadArticle(id) {
        dispatch(loadArticle(id))
    },
    finishArticle(data) {
        if (data) {
            dispatch(finishArticle(data))
        }
    },
    publishArticle(data) {
        if (data) {
            dispatch(publishArticle(data))
        }
    },
    deleteArticle(id) {
        dispatch(deleteArticle(id))
    },
    delegateArticle(params) {
        dispatch(delegateArticle(params))
    },
    rejectArticle(id) {
        if (id) {
            dispatch(rejectArticle(id))
        }
    },
    toFixArticle(id) {
        dispatch(toFixArticle(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage)
