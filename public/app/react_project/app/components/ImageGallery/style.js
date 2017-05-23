import React from 'react'
import styled from 'styled-components'

import { InputRedux, ImageLoaderRedux } from 'components/Form/ReduxForm'

import Icon from 'components/Icon'

import { rem } from 'utils/style'

export const Root = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Delete = styled(props => <Icon {...props} type="delete-bold" />)`
    position: absolute;
    top: -7px;
    right: -7px;
    background-color: #fff;
    border: 2px solid;
    border-radius: 50%;
    box-sizing: content-box;
    cursor: pointer;
`

export const Item = styled.div`
    flex: 0 1 auto;
    width: ${rem(150)};
    margin-bottom: ${rem(20)};
    position: relative
`

export const Pic = styled.div`
    height: ${rem(90)};
`

export const Input = styled(InputRedux)`
    width: 100%;
`

export const ImageLoader = styled(ImageLoaderRedux)`
    height: ${rem(90)};

    img {
        max-height: 100%;
        max-width: 100%;
    }
`
