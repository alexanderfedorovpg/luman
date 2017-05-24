import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { EditorState, EditorBlock } from 'draft-js';
import classNames from 'classnames';

import Option from './Option';
import Input from 'components/Form/Input'
import ContentModal from 'components/Modal/ContentModal'

import { ifProp } from 'utils/style'

class Pic extends Component {
  static propTypes = {
    block: PropTypes.object,
    contentState: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      hovered: false,
    };

    this.closeModal = ::this.closeModal
  }

  // setEntityAlignmentLeft = () => {
  //   this.setEntityAlignment('left');
  // };

  // setEntityAlignmentRight = () => {
  //   this.setEntityAlignment('right');
  // };

  // setEntityAlignmentCenter = () => {
  //   this.setEntityAlignment('none');
  // };

  // setEntityAlignment = (alignment) => {
    // const { block, contentState } = this.props;
    // const entityKey = block.getEntityAt(0);
    // contentState.mergeEntityData(
    //   entityKey,
    //   { alignment },
    // );
    // config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
    // this.setState({
    //   dummy: true,
    // });
  // };

  toggleHovered = (val) => {
    return () => {
      this.setState({
        hovered: val,
      });
    }
  };

  openModal() {
    this.setState({
      isOpen: true
    })
  }

  closeModal() {
    this.setState({
      isOpen: false
    })
  }

  // renderAlignmentOptions(alignment) {
  //   return (
  //     <div
  //       className={classNames(
  //         'rdw-image-alignment-options-popup',
  //         {
  //           'rdw-image-alignment-options-popup-right': alignment === 'right',
  //         },
  //       )}
  //     >
  //       <Option
  //         onClick={this.setEntityAlignmentLeft}
  //         className="rdw-image-alignment-option"
  //       >
  //         L
  //       </Option>
  //       <Option
  //         onClick={this.setEntityAlignmentCenter}
  //         className="rdw-image-alignment-option"
  //       >
  //         C
  //       </Option>
  //       <Option
  //         onClick={this.setEntityAlignmentRight}
  //         className="rdw-image-alignment-option"
  //       >
  //         R
  //       </Option>
  //     </div>
  //   );
  // }

  setProperty(prop, value) {
    const { block, blockProps: { config }, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    contentState.mergeEntityData(
      entityKey,
      { [prop]: value },
    );

    config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));

    this.forceUpdate()
  }

  changeHandler(prop) {
    return e => {
      this.setProperty(prop, e.target.value)
    }
  }

  renderForm(data) {

    return (
      <div>
        <Input
          value={data.title || ''}
          onChange={this.changeHandler('title')}
          block
          placeholder="Название" />
        <Input
          value={data.author || ''}
          onChange={this.changeHandler('author')}
          block
          placeholder="Автор" />
        <Input
          value={data.source || ''}
          onChange={this.changeHandler('source')}
          block
          placeholder="Источник" />
      </div>
    )
  }

  renderInfo(data) {
    if (!data.author || !data.source) return null

    return (
      <figcaption>
        Фото: {data.author} / {data.source}
      </figcaption>
    )
  }

  render() {
    const { block, contentState, blockProps: { config } } = this.props;
    const { hovered, isOpen } = this.state;
    const { isReadOnly, isImageAlignmentEnabled } = config;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const data = entity.getData();
    const { src, alignment, height, width } = data;

    return (
      <span
        className={classNames(
          'rdw-image-alignment',
          'rdw-image-center',
        )} >
        <figure
          className="rdw-image-imagewrapper"
          onClick={e => {e.stopPropagation(); this.openModal()}}
          onMouseEnter={this.toggleHovered(true)}
          onMouseLeave={this.toggleHovered(false)}>
          <img
            src={src}
            alt={data.title||''}
            title={data.title||''}
            width={width}
            height={height} />

          {this.renderInfo(data)}
        </figure>
        <ContentModal
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          title="Дополнительная информация"
          contentLabel="Дополнительная информация">

          {this.renderForm(data)}
        </ContentModal>
      </span>
    );
  }
};

export default (contentBlock, config, getEditorState) => {
  const type = contentBlock.getType();
console.log('block',contentBlock.getText(), ' - ', contentBlock.getDepth())
  if (type === 'atomic') {
    const contentState = getEditorState().getCurrentContent();
    const entity = contentState.getEntity(contentBlock.getEntityAt(0));
  console.log('type:', type, 'data:', entity.data)
// console.log(contentBlock, (contentBlock.toJS||(()=>{}))(), entity)

    if (entity && entity.type === 'IMAGE') {
      return {
        component: Pic,
        editable: false,
        props: {
          config
        },
      };
    }
  }
};

const Form = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100%;

  background: rgba(0, 0, 0,.5);

  opacity: 0;
  transition: opacity .3s;

  ${ifProp('visible')`
    opacity: 1;
  `}
`
