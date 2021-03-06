import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Item from './Item'
import Detail from 'containers/Preview'
import Modal from 'components/Modal'

import DeleteModal from 'components/DeleteModal'

const Root = styled.div`
    margin-top: -9px;

    flex-basis: 100%;
`

class Content extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            selected: null,
            modalDelete: false,
            toDelete: null
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.toggleDelete = ::this.toggleDelete;
        this.delegateArticle = ::this.delegateArticle;
    }

    toggleDelete(item) {
        this.setState({
            modalDelete: !this.state.modalDelete,
            toDelete: item || null
        })
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

    delegateArticle(value) {
        this.props.delegate({id: this.state.selected.id, new_editor_id: value.id})
    }

    render() {
        let {
            data,
            old,
            publish,
            push,
            published,
            delegate,
            onDelete
        } = this.props
        let { selected } = this.state

        return (
            <Root>
                {data
                    .map(value => (
                        <Item
                            key={value.id}
                            data={value}
                            push={push}
                            open={this.selectItem}
                            publish={publish}
                            newItem={old.indexOf(value.id) == -1}
                            toggleDelete={this.toggleDelete} />
                    ))
                }

                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel="Предпросмотр"
                    onRequestClose={this.closeModal}>
                    <Detail
                        onClose={this.closeModal}
                        doneTitle={published ? 'Редактировать' : 'Опубликовать'}
                        done={id => {
                            published
                                ? push(`/editor/${id}`)
                                : publish(id)
                        }}
                        delegate={params => {
                            this.delegateArticle(params)
                            this.closeModal()
                        }}
                        data={selected} />
                </Modal>
                <DeleteModal
                    open={this.state.modalDelete}
                    toggle={this.toggleDelete}
                    onDelete={() => onDelete(this.state.toDelete)}
                />
            </Root>
        )
    }
}

export default Content
