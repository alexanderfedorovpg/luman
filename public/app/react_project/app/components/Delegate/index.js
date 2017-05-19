import React, { dangerouslySetInnerHTML } from 'react'
import styled from 'styled-components'

import Select from './Select';

import Modal from 'components/Modal'
import H2 from 'components/H2'
import Button from 'components/Button'
import Icon from 'components/Icon'

const Root = styled.div`
    width: 500px;
    padding: 30px 1.5rem 79px;
    margin: auto;
    font-family: 'Open Sans', Arial, sans-serif;
    background-color: #fff;
    height: 100%;
    overflow-y: auto;
`

function Delegate({toggle, open, change, users, value}) {

    return (
        <Modal
            isOpen={open}
            contentLabel="Сменить редактора"
            onRequestClose={toggle}>
            <Root>
                <h2>Сменить редактора</h2>
                <Select
                    options={users}
                    onChange={change}
                    value={value} />
                    <br/>
                    <br/>
                    <Button block danger onClick={toggle}>
                        <Icon type="delete-bold" />
                        Закрыть
                    </Button>
            </Root>
        </Modal>
    )
}

export default Delegate;