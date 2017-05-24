import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Entity, AtomicBlockUtils } from 'draft-js';

import Input from 'components/Form/Input'
import ImageLoaderBase from 'components/Form/ImageLoader'

import classNames from 'classnames';

import Option from './Option';

const ImageLoader = styled(ImageLoaderBase)`
  height: 115px;
  border: 1px solid rgba(204, 204, 204, 0.74);

  img {
      width: 100%;
      height: auto;
  }
`

export default class LayoutComponent extends Component {

  static propTypes: {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      imgSrc: '',
      dragEnter: false,
      uploadHighlighted: props.config.uploadEnabled && !!props.config.uploadCallback,
      showImageLoading: false,
      height: props.config.defaultSize.height,
      width: props.config.defaultSize.width,
      title: '',
      author: '',
      source: '',
    };
  }


  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        imgSrc: '',
        dragEnter: false,
        uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
        showImageLoading: false,
        height: this.props.config.defaultSize.height,
        width: this.props.config.defaultSize.width,
      })
    } else if (props.config.uploadCallback !== this.props.config.uploadCallback ||
      props.config.uploadEnabled !== this.props.config.uploadEnabled) {
      this.setState({
        uploadHighlighted: props.config.uploadEnabled && !!props.config.uploadCallback,
      });
    }
  }

  updateValue = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  toggleShowImageLoading = () => {
    const showImageLoading = !this.state.showImageLoading;
    this.setState({
      showImageLoading,
    });
  };

  showImageURLOption = () => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  showImageUploadOption = () => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  addImageFromState = () => {
    const { imgSrc, height, width, author, title, source } = this.state;
    const { onChange } = this.props;
    onChange({
      src: imgSrc,
      height,
      width,
      author,
      title,
      source
    });
  };

  addImageFromSrcLink = (imgSrc: string) => {
    const { height, width } = this.state;
    const { onChange } = this.props;
    onChange(imgSrc, height, width);
  };

  onImageDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dragEnter: false,
    });
    this.uploadImage(event.dataTransfer.files[0]);
  };

  onDragEnter = (event) => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  selectImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  uploadImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        imgSrc: e.target.result,
        dragEnter: false,
      });
    }
    reader.readAsDataURL(file);
  };

  fileUploadClick = (event) => {
    this.fileUpload = true;
    event.stopPropagation();
  }

  stopPropagation = (event) => {
    if (!this.fileUpload) {
      // event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  renderAddImageModal() {
    const { imgSrc, uploadHighlighted, showImageLoading, dragEnter, height, width } = this.state;
    const { config: { popupClassName, uploadCallback, uploadEnabled, urlEnabled, inputAccept }, doCollapse, translations } = this.props;
    return (
      <div
        className={classNames('rdw-image-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <ImageLoader
          name="image"
          accept="image/*"
          value={imgSrc}
          onChange={this.selectImage}
          icon />

        <Input
          onChange={this.updateValue}
          name="title"
          block
          placeholder="Название" />

        <Input
          onChange={this.updateValue}
          name="author"
          block
          placeholder="Автор" />

        <Input
          onChange={this.updateValue}
          name="source"
          block
          placeholder="Источник" />

        <div className="rdw-embedded-modal-size" style={{ marginTop: 10 }}>
          &#8597;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={height}
            name="height"
            className="rdw-embedded-modal-size-input"
            placeholder="Height"
          />
          &nbsp;&#8596;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={width}
            name="width"
            className="rdw-embedded-modal-size-input"
            placeholder="Width"
          />
        </div>
        <span className="rdw-image-modal-btn-section">
          <button
            className="rdw-image-modal-btn"
            onClick={this.addImageFromState}
            disabled={!imgSrc}
          >
            {translations['generic.add']}
          </button>
          <button
            className="rdw-image-modal-btn"
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
      </div>
    );
  }

  render() {
    const { config: { icon, className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="rdw-image-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-image-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.renderAddImageModal() : undefined}
      </div>
    );
  }
}
