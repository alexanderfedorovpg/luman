import React, { PureComponent }  from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import Icon from 'components/Icon'

const Root = styled.div`
    margin-right: 20px;
    margin-bottom: 7px;
    float: left;

    box-sizing: content-box;
    border: 1px solid rgba(204,204,204,.74);
    width: 430px;
    height: 275px;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 32px;
    padding-right: 10px;
    padding-bottom: 3px;

    background-color: #f4f4f4;
`

const CustomIcon = styled(Icon)`
    margin-left: 9px;

    cursor: pointer;
`

const StyledDropzone = styled(Dropzone)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    height: 243px;
    border: 2px dashed rgb(102, 102, 102);
    border-radius: 5px;
`

class ImageEditor extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            image: {
                data: null,
                top: 0,
                left: 0,
                width: 0,
                height: 0
            },
            rect: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            },
            dragging: false,
            mod: 'move'
        }

        this.onDrop = this.onDrop.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
    }

    updateDimensions() {
        if (this.state.image.data) {
            const image = new window.Image()

            image.onload = () => {
                this.setState({
                    image: {
                        ...this.state.image,
                        width: image.width,
                        height: image.height
                    }
                }, this.updateCanvas)
            }

            image.src = this.state.image.data.preview
        }
    }

    toggleMod(mod) {
        return () => {
            this.setState({
                mod: mod === this.state.mode ? 'move' : mod
            })
        }
    }

    deleteImg() {

    }

    onDrop(acceptedFiles) {
        if (acceptedFiles[0]) {
            this.setState({
                image: {
                    ...this.state.image,
                    data: acceptedFiles[0]
                }
            }, this.updateDimensions)
        }
    }

    renderDropzone() {

        return (
            <StyledDropzone
                onDrop={this.onDrop}
                multiple={false}>

                Переместите изображение<br />
                либо<br />
                кликните для выбора изображения
            </StyledDropzone>
        )
    }

    renderImage() {
        if (this.state.image.data) {
            const image = new Image()
            image.src = this.state.image.data.preview

            this.ctx.drawImage(
                image,
                this.state.image.left,
                this.state.image.top,
                this.state.image.width,
                this.state.image.height)
        }
    }

    renderRect() {
        const { rect } = this.state

        switch (this.state.mod) {
            case 'crop':
                this.ctx.strokeRect(
                    rect.x1,
                    rect.y1,
                    rect.x2 - rect.x1,
                    rect.y2 - rect.y1)

                break
        }

    }

    updateCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.renderImage()
        this.renderRect()
    }

    onMouseDown(e) {
        const canvasPos = this.ctx.canvas.getBoundingClientRect()

        this.setState({
            rect: {
                ...this.state.rect,
                x1: e.clientX - canvasPos.left,
                y1: e.clientY - canvasPos.top,
                x2: e.clientX - canvasPos.left,
                y2: e.clientY - canvasPos.top,
            },
            dragging: true
        })
    }

    onMouseMove(e) {
        if (!this.state.dragging) return

        const canvasPos = this.ctx.canvas.getBoundingClientRect()

        this.setState({
            rect: {
                ...this.state.rect,
                x2: e.clientX - canvasPos.left,
                y2: e.clientY - canvasPos.top,
            }
        }, this.updateCanvas)
    }

    onMouseUp(e) {
        const canvasPos = this.ctx.canvas.getBoundingClientRect()

        this.setState({
            rect: {
                ...this.state.rect,
                x2: e.clientX - canvasPos.left,
                y2: e.clientY - canvasPos.top,
            },
            dragging: false
        }, this.updateCanvas)
    }

    render() {

        return (
            <Root>
                <Header>
                    <CustomIcon
                        type="resize"
                        active={this.state.mod=='resize'}
                        onClick={this.toggleMod('resize')} />
                    <CustomIcon
                        type="rotate"
                        active={this.state.mod=='rotate'}
                        onClick={this.toggleMod('rotate')} />
                    <CustomIcon
                        type="crop"
                        active={this.state.mod=='crop'}
                        onClick={this.toggleMod('crop')} />
                    <CustomIcon onClick={this.deleteImg} type="delete-lg" />
                </Header>

                {!this.state.image.data
                    ? this.renderDropzone()
                    : null}
                <canvas
                    width="430"
                    height="243"
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}
                    ref={el=>{if (el) this.ctx = el.getContext('2d')}}
                    draggable="false"></canvas>
            </Root>
        )
    }
}

export default ImageEditor
