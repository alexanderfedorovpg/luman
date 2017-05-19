import React, { dangerouslySetInnerHTML } from 'react'
import styled from 'styled-components'

import Select from './Select';

import Modal from 'components/Modal'
import H2 from 'components/H2'
import Button from 'components/Button'
import Icon from 'components/Icon'

import { font } from 'constants/style'

const Root = styled.div`
    width: 500px;
    padding: 30px 1.5rem 79px;
    margin: auto;
    font-family: ${font.opensans};
    background-color: #fff;
    height: 100%;
    overflow-y: auto;
`

function Delegate({onClose, isOpen, onChange, users, value}) {

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Сменить редактора"
            onRequestClose={onClose}>
            <Root>
                <h2>Сменить редактора</h2>
                <Select
                    options={users}
                    onChange={onChange}
                    value={value} />
                    <br/>
                    <br/>
                    <Button block danger onClick={onClose}>
                        <Icon type="delete-bold" />
                        Закрыть
                    </Button>
            </Root>
        </Modal>
    )
}

export default Delegate;
