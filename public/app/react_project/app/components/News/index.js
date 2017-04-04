import React, { Component } from 'react'
import styled from 'styled-components'

import Item from './Item'
import Detail from './Detail'
import Modal from '../Modal'
import Paginator from '../Paginator'

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
            <div>
                <div style={{ opacity: loading ? .3 : 1 }}>
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
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel="Новость"
                    onRequestClose={this.closeModal}>
                    <Detail onClose={this.closeModal} data={selected} />
                </Modal>
                {data.count()
                    ? <Paginator {...pagination} />
                    : null}
            </div>
        )
    }
}

News.PropTypes = {
    data: React.PropTypes.array.isRequired
}

export default News
