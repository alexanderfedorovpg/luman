import React, { Component } from 'react'
import styled from 'styled-components'

import Item from './Item'
import Detail from './Detail'
import Modal from '../Modal'

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
        return this.props.data.find(value => value.get('id') === this.state.selected)
    }

    render() {
        let { data, hide, toWork } = this.props

        let selected = this.getItemById(this.state.selected)

        return (
            <div>
                {data.map((value, index) => {
                    return (
                        <Item
                            key={value.get('id')}
                            data={value.toJS()}
                            hide={hide}
                            toWork={toWork}
                            open={this.selectItem} />
                    )
                })}
                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel="Новость"
                    onRequestClose={this.closeModal}>
                    <Detail onClose={this.closeModal} data={selected} />
                </Modal>
            </div>
        )
    }
}

News.PropTypes = {
    data: React.PropTypes.array.isRequired
}

export default News
