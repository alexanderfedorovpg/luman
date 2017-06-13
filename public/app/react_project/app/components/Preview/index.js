import React, {Component} from 'react';
import styled from 'styled-components';

import NewsDetail from './NewsDetail/';
import RenderSocialWidgets from './RenderSocialWidgets';
import Icon from 'components/Icon';

import {padding, font} from 'constants/style';

const Root = styled.div`
    max-width: 908px;
    padding: 30px ${padding} 79px;
    margin: auto;
    font-family: ${font.opensans};

    background-color: #fff;

    height: 100%;
    overflow-y: auto;
`;

const CloseButton = styled(Icon)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
`;

class Preview extends Component {
    replaceWidgets() {
        if (this._timer) clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            RenderSocialWidgets()
        }, 1000)
    }

    componentDidMount() {
        this.replaceWidgets()
    }

    componentDidUpdate() {
        this.replaceWidgets()
    }

    render() {
        const {data, users, onClose} = this.props;
        let hasVideo = !!data.video_stream.url;
        return (
            <Root>
                <CloseButton type="delete-lg" onClick={onClose}/>
                <NewsDetail data={data} hasVideo={hasVideo}/>
            </Root>
        );
    };
}

export default Preview;
