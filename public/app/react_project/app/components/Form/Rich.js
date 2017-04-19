import React, { PureComponent } from 'react'
import styled from 'styled-components'
import {
    Editor,
    EditorState,
    ContentState,
    convertFromHTML,
    RichUtils
} from 'draft-js'

import Icon from 'components/Icon'
import Button from 'components/Button/Link'

import { padding, font } from 'constants/style'

const Root = styled.div`
    border: 1px solid rgba(204, 204, 204, 0.74);
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    padding-right: 14px;
    padding-bottom: 7px;
    padding-left: ${padding};

    background-color: #f4f4f4;
`

const Content = styled.div`
    padding-top: ${padding};
    padding-left: 21px;
    padding-right: 21px;
    padding-bottom: ${padding};

    color: #666666;
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    &:selection {
        background: #b0d7eb;
    }
    p {
        margin-top: 0;

        color: #666666;
        font-family: ${font.opensans};
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;

        &:last-child {
            margin-bottom: 0;
        }

    }
`

const CustomIcon = styled(Icon)`
    cursor: pointer;
    margin-right: 17px;
`

const Clear = styled(Button)`
    opacity: 0.62;

    &:hover {
        opacity: 1;
    }
`

class Rich extends PureComponent {

    constructor(props) {
        super(props);

        const blocksFromHTML = convertFromHTML(this.props.value||'');
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );

        this.INLINE_STYLES = [
            { icon: 'text-bold', style: 'BOLD' },
            { icon: 'text-italic', style: 'ITALIC' }
        ]

        this.state = {
            editor: EditorState.createWithContent(state)
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(editorState) {
        this.setState({
            editor: editorState
        })
    }

    toggleInlineStyle(style) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editor,
                style
            )
        )
    }

    render() {

        return (
            <Root>
                <Header>
                    <div>
                        {this.INLINE_STYLES.map(({ icon, style }, index) => {
                            return (
                                <CustomIcon
                                    key={index}
                                    type={icon}
                                    onClick={this.toggleInlineStyle.bind(this, style)} />
                            )
                        })}
                        <CustomIcon type="image" />
                        <CustomIcon type="images" />
                        <CustomIcon type="text-video" />
                        <CustomIcon type="orph" />
                    </div>
                    <div>
                        <Clear>Очистить</Clear>
                    </div>
                </Header>
                <Content>
                    <Editor
                        editorState={this.state.editor}
                        onChange={this.onChange}
                        spellCheck={true} />
                </Content>
            </Root>
        )
    }
}

export default Rich
