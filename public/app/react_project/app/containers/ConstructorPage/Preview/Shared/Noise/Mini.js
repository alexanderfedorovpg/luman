import React from 'react'
import styled from 'styled-components'

import Mini from '../Mini'

import { rem } from 'utils/style'

export default styled(Mini)`
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: 0 !important;

    &:not(:first-child) {
        margin-top: ${rem(11)};
    }

    &:first-child {

        .mini-news__title {
            font-weight: 700;
            font-size: ${rem(21)};
            line-height: ${rem(21)};
            letter-spacing: ${rem(-0.2)};
        }
    }

    .mini-news__title {
        display: inline-block;

        font-size: ${rem(14)};
        line-height: ${rem(18)};
    }
`
