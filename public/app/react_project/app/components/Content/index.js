import React from 'react'
import styled from 'styled-components';

import { padding } from './../../constants/style'

const Content = styled.div`
    padding-right: ${padding};
    margin-top: 138px;
    margin-left: 67px;

`

export const Wrap = styled.div`
    display: flex;
    align-items: stretch;
`

export const Left = styled.div`
    flex: 1;
    margin-top: -11px;
    border-right: 1px solid #d7d7d7;
`

export const Right = styled.div`
    width: 40.384%;
    flex-basis: 40.383%;
    margin-top: 0;
    padding-left: ${padding};
`

export default Content
