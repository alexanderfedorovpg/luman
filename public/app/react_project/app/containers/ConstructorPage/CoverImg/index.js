/**
 * Created by Frimko on 19.06.2017.
 * mailto ccc-car@yandex.ru.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import UploadPreviewImg from 'components/Constructor/UploadPreviewImg';
import {getCoverImg, setCoverImg} from '../actions';
import {selectCoverImg} from '../selectors';

class CoverImg extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCoverImg()
    }

    render() {
        return <UploadPreviewImg updateCoverImg={this.props.setCoverImg} srcImg={this.props.srcImg}/>;
    }
}

const mapStateToProps = state => ({
    srcImg: selectCoverImg(state).url,
})

const mapDispatchToProps = dispatch => ({
    setCoverImg(value) {
        dispatch(setCoverImg(value));
    },
    getCoverImg() {
        dispatch(getCoverImg());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CoverImg);
