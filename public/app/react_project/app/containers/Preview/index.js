import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectRubrics } from 'containers/App/selectors'

import {
    selectEditors,
} from 'containers/App/selectors'

import { checkPermissons } from 'utils/permissons'

import Preview from 'components/Preview'

class EditorPage extends Component {

    render() {

        return (
            <Preview {...this.props} />
        )
    }
}

const mapStateToProps = state => ({
    users: selectEditors(state).toJS(),
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage)
