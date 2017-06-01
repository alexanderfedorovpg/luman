import React from 'react';
import styled from 'styled-components';
import { FormattedTime, FormattedRelative } from 'react-intl';

import NewsDetail from './NewsDetail/';
import Icon from 'components/Icon';

import { padding, font } from 'constants/style';

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

const Preview = ({ data, users, onClose}) => {
    let hasVideo = !!data.video_stream.url;
    return (
        <Root>
            <CloseButton type="delete-lg" onClick={onClose} />
            <NewsDetail data={data} hasVideo={hasVideo}/>
        </Root>
    );
};

export default Preview;
