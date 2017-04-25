import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import randomString from 'random-string'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Item from './Item'
import Detail from './Detail'
import Modal from 'components/Modal'
import Paginator from 'components/Paginator'

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
@DragDropContext(HTML5Backend)
export default class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            selected: null
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.selectItem = this.selectItem.bind(this)
    }

    openModal() {
        if (!this.state.modalOpen) {
            this.setState({
                modalOpen: true
            })
        }
    }

    closeModal() {
        if (this.state.modalOpen) {
            this.setState({
                modalOpen: false
            })
        }
    }

    selectItem(item) {
        this.setState({
            selected: item
        })

        this.openModal()
    }

    getItemById(id) {
        let item = this.props.data.find(value => value.get('id') === this.state.selected)

        return item ? item.toJS() : {}
    }

    render() {
        let { data, hide, toWork, pagination, loading } = this.props

        // let selected = this.getItemById(this.state.selected)

        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName={animationClassName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {data.map(value => (
                        <Item
                            key={value.id}
                            data={value}/>
                    ))}
                </ReactCSSTransitionGroup>
                <Paginator {...pagination} />
            </div>
        )
    }
}

News.PropTypes = {
    data: React.PropTypes.array.isRequired
}

// export default News
