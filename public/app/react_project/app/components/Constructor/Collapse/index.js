import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header';
import Item from './Item';
import { Group as GroupBase } from 'components/Form';
import Input from 'components/Form/Input';

import { rem } from 'utils/style'

const Root = styled.div`
    margin-top: ${rem(9)};
    height: calc(100% - 32px);
    overflow-y: auto;
`

const Group = styled(GroupBase)`
    padding-left: ${rem(18)};
    margin-top: 12px;
    margin-bottom: 12px;
`

class Collapse extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        let {
            warTitle,
            setTitle,
            showTitle,
            categories,
            data,
            choose,
            onMove,
            onRemove
        } = this.props

        return (
            <Root>
                {showTitle
                    ? (
                        <Group>
                            <Input
                                onChange={(e)=>setTitle(e.target.value)}
                                value={warTitle||''}
                                block />
                        </Group>
                    )
                    : null
                }
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
