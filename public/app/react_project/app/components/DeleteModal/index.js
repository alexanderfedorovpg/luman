import React from 'react'
import styled, { injectGlobal } from 'styled-components'

import Modal from 'components/Modal'

import Button from 'components/Button'
import Icon from 'components/Icon'

const ModalRoot = styled.div`
    max-width: 536px;
    padding: 32px 26px 27px 23px;
    background: #fff;
    box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.37);
`

const ModalText = styled.p`
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
    color: #333333;
    letter-spacing: -0.3px;
`

const ModalTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 24px;
    font-weight: 600;
    letter-spacing: -0.5px;
`

const ButtonsWrap = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 25px;

    Button:first-child {
        margin-right: 3px;
    }

`

const ModalClose = styled.a`
    position: absolute;
    top: 14px;
    right: 14px;
    cursor: pointer;
`


function DeleteModal({onDelete, toggle, open}) {
    return (
        <Modal
            isOpen={open}
            contentLabel="Удалить задание"
            onRequestClose={toggle}>
            <ModalRoot>
                <ModalTitle>Внимание: удаление!</ModalTitle>
                <ModalText>Вы уверены, что хотите удалить задание?</ModalText>
                <ButtonsWrap>
                    <Button md danger onClick={toggle}>
                        <Icon type="delete-bold"/>
                        Отменить
                    </Button>
                    <Button md success onClick={(e) => {
                            onDelete()
                            toggle()
                        }}>
                        <Icon type="arrow-right"/>
                        Подтвердить
                    </Button>
                </ButtonsWrap>
                <ModalClose onClick={() => toggle()}>
                    <Icon type="delete-bold"/>
                </ModalClose>
            </ModalRoot>
        </Modal>
    )
}

export default DeleteModal;
