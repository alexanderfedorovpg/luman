import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import randomString from 'random-string'

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

class News extends Component {

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

        let selected = this.getItemById(this.state.selected)

        return (
            <div style={{ opacity: loading ? .3 : 1}}>
                <ReactCSSTransitionGroup
                    transitionName={animationClassName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {data.toJS().map(value => (
                        <Item
                            key={value.id}
                            data={value}
                            hide={hide}
                            toWork={toWork}
                            open={this.selectItem} />
                    ))}

                </ReactCSSTransitionGroup>
                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel="Новость"
                    onRequestClose={this.closeModal}>
                    <Detail
                        onClose={this.closeModal}
                        data={selected}
                        toWork={toWork}
                        ignore={hide} />
                </Modal>
                <Paginator {...pagination} />
            </div>
        )
    }
}

News.PropTypes = {
    data: React.PropTypes.array.isRequired
}

export default News
