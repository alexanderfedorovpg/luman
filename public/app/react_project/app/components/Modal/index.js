import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'

import ReactModal from 'react-modal'


const styles = {
    overlay: {
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, .4)'
    },
    content: {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    }
}

function Modal(props) {
    let innerProps = Object.assign({}, props, {
        style: styles
    })

    return (
        <ReactModal {...innerProps} />
    )
}

export default Modal
