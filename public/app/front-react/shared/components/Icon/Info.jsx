import React from 'react'
import classNames from 'classnames'

function InfoIcon({ className, width, height }) {

    return (
        <svg className={classNames('icon icon_info', className)} xmlns="http://www.w3.org/2000/svg" width={width||'23px'} height={height||'23px'} viewBox="0 0 23 23">
            <path d="M11.49.94a10.57 10.57 0 0 0 0 21.12 10.57 10.57 0 0 0 0-21.12zm0 19.2a8.65 8.65 0 0 1 0-17.28 8.65 8.65 0 0 1 0 17.28zm0-14.72a1.28 1.28 0 1 0 0 2.56 1.28 1.28 0 0 0 0-2.56zm0 4.48a.96.96 0 0 0-.96.96v5.76a.96.96 0 1 0 1.92 0v-5.76a.96.96 0 0 0-.96-.96z"/>
            <path fill="#bbc0c4" d="M11.49.94a10.57 10.57 0 0 0 0 21.12 10.57 10.57 0 0 0 0-21.12zm0 19.2a8.65 8.65 0 0 1 0-17.28 8.65 8.65 0 0 1 0 17.28zm0-14.72a1.28 1.28 0 1 0 0 2.56 1.28 1.28 0 0 0 0-2.56zm0 4.48a.96.96 0 0 0-.96.96v5.76a.96.96 0 1 0 1.92 0v-5.76a.96.96 0 0 0-.96-.96z"/>
        </svg>
    )
}

export default InfoIcon
