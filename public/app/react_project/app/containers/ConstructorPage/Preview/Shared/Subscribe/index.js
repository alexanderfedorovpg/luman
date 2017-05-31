import React from 'react';
import styled from 'styled-components';

import image from './subscribe.png';
import { rem } from 'utils/style'

const Root = styled.div`
    width: ${rem(300)};
`

const Img = styled.img`
    width: 100%;
    // width: ${rem(300)};
`

function Subscribe({ className }) {
    return (
        <Root className={className}>
            <a href="javascript:void(0)">
                <Img src={image} alt="" role="presentation" />
            </a>
        </Root>
    )
}

export default Subscribe;
