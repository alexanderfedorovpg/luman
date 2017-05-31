import React from 'react'
import styled, { css } from 'styled-components'

import Title from './SectionTitle'

import { rem, ifProp } from 'utils/style'

const Root = styled.div`

    ${ifProp('margin')(css`
        margin-top: ${rem(28)};
    `)}
`

const Wrapper = styled.div`
   margin-top: ${rem(17)};
`

function Group({ title, children, margin, className }) {

    return (
        <Root className={className} margin={margin}>
            <Title>
                {title}
            </Title>
            <Wrapper>
                {children}
            </Wrapper>
        </Root>
    )
}

export default Group
