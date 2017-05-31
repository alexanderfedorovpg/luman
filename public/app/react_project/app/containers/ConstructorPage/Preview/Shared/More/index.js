import React from 'react'
import styled from 'styled-components'

import MiniBase from '../Mini'

import { rem } from 'utils/style'

const Mini = styled(MiniBase)`
    padding-top: 0;
    padding-bottom: 0;
    width: ${rem(280)};

    border-bottom: none !important;

    &:not(:first-child) {
        margin-top: ${rem(8)};
        margin-bottom: ${rem(13)};
    }

    .mini-news__title {
        display: inline-block;

        font-size: ${rem(14)};
        line-height: ${rem(16)};
        letter-spacing: ${rem(-.25)};
    }

    .mini-news {
    }

    .mini-news__date {
        margin-top: 0;

        line-height: ${rem(18)};
    }
`

function More({ data, className }) {
    if (!data) return null

    return (
        <div className={className}>
            {data.map(value => (
                <Mini key={value.id} data={value} />
            ))}
        </div>
    )
}

export default More
