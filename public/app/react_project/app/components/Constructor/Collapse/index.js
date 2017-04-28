import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header';
import Item from './Item';

import { rem } from 'utils/style'

const Root = styled.div`
    margin-top: ${rem(9)};
    margin-left: ${rem(-19)};
`

class Collapse extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        let { categories, data, choose, onMove, onRemove } = this.props

        return (
            <Root>
                {categories.map(cat => {
                    return (
                        <Item
                            key={cat.id}
                            category={cat}
                            choose={choose}
                            onMove={onMove}
                            onRemove={onRemove}
                            data={data[cat.id]} />
                    )
                })}
            </Root>
        )
    }
}

export default Collapse
