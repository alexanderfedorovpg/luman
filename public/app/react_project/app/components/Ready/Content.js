import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Item from './Item'
import Detail from 'components/Preview'
import Modal from 'components/Modal'

const Root = styled.div`
    margin-top: -9px;

    flex-basis: 100%;
`

class Content extends PureComponent {

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

    render() {
        let { data, old, publish } = this.props
        let { selected } = this.state

        return (
            <Root>
                {data
                    .filter(v => !+v.is_publish)
                    .map(value => (
                        <Item
                            key={value.id}
                            data={value}
                            open={this.selectItem}
                            publish={publish}
                            newItem={old.indexOf(value.id) == -1} />
                    ))
                }

                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel="Предпросмотр"
                    onRequestClose={this.closeModal}>
                    <Detail
                        onClose={this.closeModal}
                        done={publish}
                        data={selected} />
                </Modal>
            </Root>
        )
    }
}

export default Content
