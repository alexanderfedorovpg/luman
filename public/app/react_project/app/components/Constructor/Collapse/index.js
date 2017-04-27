import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header';
import Item from './Item';

import { rem } from 'utils/style'

const Wrap = styled.div`
    margin-top: ${rem(9)};
    margin-left: ${rem(-19)};
`

class Collapse extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        let { categories, data, active, onWarModeChange, war, choose, onRemove } = this.props
        const news = (data[active]||[])

        return (
            <div>
                <Header data={data} war={war} onWarModeChange={onWarModeChange} />
                <Wrap>
                    {categories.map(value => {
                        const itemData = news
                            .filter(isItemData(active, value))
                            .map(v => v.data)

                        return (
                            <Item
                                key={value.id}
                                category={value}
                                choose={choose}
                                onRemove={onRemove}
                                data={itemData} />
                        )
                    })}
                </Wrap>
            </div>
        )
    }
}

export default Collapse

function isItemData(type, value) {
    switch (type) {
        case 'news':
            return item => value.id == item.category.id

        case 'noise':
            return item => true

        case 'broadcast':
            return item => value.id == item.data.program_id

        default:
            return (v) => v
    }
}
