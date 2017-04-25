import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import randomString from 'random-string'

import styled from 'styled-components';

import Tabs from './Tabs';
import Tumbler from './Tumbler';

const Root = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
`

const Left = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding-top: 1px;
`

class Collapse extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        return (
            <Root>
                <Left>
                    <Tumbler />
                    <Tabs data={this.props.tabs} />
                </Left>
            </Root>
        )
    }
}

export default Collapse;