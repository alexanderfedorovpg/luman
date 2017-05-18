import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import randomString from 'random-string'

import Item from './Item.supervisor'

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
    width: 100%;
    margin-top: -15px;
`

function Content({ news, push, old, clearTask, postMessage, toggle, open }) {

    return (
        <Root>
            <ReactCSSTransitionGroup
                transitionName={animationClassName}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>

                {news.map(value => (
                    <Item
                        key={value.id}
                        push={push}
                        data={value}
                        clearTask={clearTask}
                        postMessage={postMessage}
                        newItem={old.indexOf(value.id) == -1} 
                        toggle={toggle}
                        open={open}/>
                ))}
            </ReactCSSTransitionGroup>
        </Root>
    )
}

export default Content


/*  
<Modal
    isOpen={open}
    contentLabel="Удалить задание"
    onRequestClose={toggle}>
    <div>
        <button>Удалить</button>
    </div>
</Modal>
*/