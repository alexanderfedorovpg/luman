import React from 'react'
import styled from 'styled-components'

import { rem } from 'utils/style'
import { color } from 'constants/style'

const Root = styled.div`
    margin-top: ${rem(4)};
`

const Text = styled.p`
    font-size: ${rem(11)};
    line-height: ${rem(17)};
    color: ${color.copyright};
`

function Copyright() {

    return (
        <Root>
            <Text>&#169; Overseas Media,
                <br />2002–2017
            </Text>
        </Root>
    )
}

export default Copyright
