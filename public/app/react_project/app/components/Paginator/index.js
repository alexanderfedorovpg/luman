import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import Button from '../Button'

const Root = styled.div`
    margin: 20px 0;
    text-align: center
`

const Container = styled.span`
    margin: 0 15px;
`

const CustomButton = styled(Button)`
    &:hover {
        color: inherit
    }
`

function Paginator({ current, max, goPrev, goNext }) {
    return current === max
        ? null

        : <Root>
            <Link to={{
                    pathname: '/feed',
                    query: {
                        page: current > 1 ? current-1 : current
                    }
                }}>
                &lt;
            </Link>
            <Container>
                {current} из {max}
            </Container>
            <Link to={{
                    pathname: '/feed',
                    query: {
                        page: current < max ? current+1 : current
                    }
                }}>
                &gt;
            </Link>
        </Root>
}

export default Paginator
