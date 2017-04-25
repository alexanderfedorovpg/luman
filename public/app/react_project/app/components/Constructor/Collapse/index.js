import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import randomString from 'random-string'
import styled from 'styled-components'
import Header from './Header';
import CollapseItem from './CollapseItem';

const CollapseWrap = styled.div`
    margin-top: 0.5625rem;
    margin-left: -1.1875rem;
`

class Collapse extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header tabs={this.props.tabs} />
                <CollapseWrap>
                    <CollapseItem opened={`${true}`} title="Сейчас"/>
                    <CollapseItem opened={`${true}`} title="Главное за сутки"/>
                    <CollapseItem title="Прочее"/>
                </CollapseWrap>
            </div>
        )
    }
}

export default Collapse;