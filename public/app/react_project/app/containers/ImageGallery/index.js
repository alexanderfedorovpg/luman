import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import ImageGallery from 'components/ImageGallery'

import { saveImage, loadImages } from './actions'
import { selectImages } from './selectors'

class ImageGalleryContainer extends PureComponent {

    componentDidMount() {
        this.props.loadImages()
    }

    render() {

        return <ImageGallery {...this.props} />
    }
}

const mapStateToProps = state => ({
    data: selectImages(state)
})

const mapDispatchToProps = dispatch => ({
    onSave(data) {
        dispatch(saveImage(data.toJS()))
    },
    onDelete(id) {
        console.log('delete', id)
    },
    loadImages() {
        dispatch(loadImages())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageGalleryContainer)
