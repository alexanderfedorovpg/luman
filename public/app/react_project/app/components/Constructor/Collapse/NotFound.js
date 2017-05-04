import React, { Component } from 'react'
import styled from 'styled-components'

import DropTarget from './DropTarget'

import { rem, ifProp } from 'utils/style'
import { padding } from 'constants/style'

const Root = styled.div`
    padding-top: ${padding};
    padding-bottom: ${padding};
    padding-right: ${rem(35)};
    padding-left: ${rem(18)};

    ${ifProp('over')`
        background-color: #ddd
    `}
`

class NotFound extends Component {

    render() {
        let { connectDropTarget, isOver } = this.props

        return connectDropTarget(
            <div>
                <Root over={isOver}>
                    Ничего не найдено
                </Root>
            </div>
        )
    }
}

export default DropTarget(NotFound)
