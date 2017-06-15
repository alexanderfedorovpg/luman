import React from 'react'
import styled from 'styled-components'

import { Left as ContentLeft, Right as ContentRight } from 'components/Content'
import { ImageLoaderRedux, InputRedux } from 'components/Form/ReduxForm';

import { padding, font, color } from 'constants/style'
import { rem } from 'utils/style'

export const Left = styled(ContentLeft)`
    margin-top: 0;
    border-right: 0;
`

export const Right = styled(ContentRight)`
    flex-basis: auto;
    width: auto;
`

export const ImageLoader = styled(ImageLoaderRedux)`
    width: ${rem(120)};
    height: ${rem(120)};
    border: 1px solid rgba(204, 204, 204, 0.74);

    img {
        width: 100%;
        height: auto;
    }
`

export const Root = styled.div`
    padding-left: ${padding};
    margin-top: 6px;
`

export const VideoStatus = styled.div`
    font-family: ${font.opensans};
    font-size: 13px;
    color: #999;
    font-weight: 600;
    letter-spacing: 0.1px;

    width: 235px;
`

export const VideoStatusTitle = styled.span`
    font-weight: 700;
    letter-spacing: 0;
    color: ${color.success};
`

export const VideoStatusTimer = styled.span`
    font-weight: 400;
`

export const Data = styled.div`
    margin-bottom: ${rem(27)};
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;

`

export const Title = styled(InputRedux)`
    font-size: ${rem(30)};
    color: #333;
`

export const DataText = styled.div`
    width: calc(100% - ${rem(127)});
`
