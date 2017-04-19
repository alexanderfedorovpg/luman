import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import randomString from 'random-string'

import Item from './Item.editor'

import { font } from 'constants/style'

const animationClassName = randomString()

injectGlobal`
    .${animationClassName}-leave {
        max-height: 500px;
        opacity: 1;
    }

    .${animationClassName}-leave-active {
        opacity: 0.01;
        max-height: 0px;
        transition: all .5s;
    }
`

const Root = styled.div`
    margin-top: -.5rem;

    font-family: ${font.opensans};
`

function Content({ news, old, reject, accept }) {

    return (
        <Root>
            <ReactCSSTransitionGroup
                transitionName={animationClassName}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>

                {news.map(value => (
                    <Item
                        key={value.id}
                        data={value}
                        newItem={old.indexOf(value.id) == -1}
                        reject={reject}
                        accept={accept} />
                ))}
            </ReactCSSTransitionGroup>
        </Root>
    )
}

export default Content
