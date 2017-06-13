import React from 'react'
import classNames from 'classnames'

function ScissorsIcon({ className, width, height }) {

    return (
        <svg className={classNames('icon icon_scissors', className)} xmlns="http://www.w3.org/2000/svg" width={width||'26px'} height={height||'19px'} viewBox="0 0 26 19">
            <path d="M6.64 18.33a4.58 4.58 0 0 0 2.19-2.72c.23-.85.16-1.72-.27-2.47l3.93-2.25c2.77 1.4 8.98 4.51 9.96 5.07 1.27.72 2.77-.57 2.77-.57l-10.3-5.9 10.3-5.88s-1.5-1.3-2.77-.57c-.98.56-7.19 3.68-9.96 5.07L8.57 5.86c.42-.75.49-1.62.26-2.46A4.57 4.57 0 0 0 6.64.67c-2.03-1.16-4.48-.72-5.46 1-.43.75-.5 1.63-.27 2.48a4.6 4.6 0 0 0 2.18 2.72c.5.29 1.03.47 1.55.57h-.01.02l.13.02c3.23.48 4.88 1.4 5.68 2.04-.8.64-2.45 1.56-5.68 2.04l-.13.01h-.02.01a5 5 0 0 0-1.55.58 4.6 4.6 0 0 0-2.18 2.72c-.23.85-.16 1.72.27 2.49.98 1.7 3.43 2.15 5.46.99zM4.05 5.2a2.7 2.7 0 0 1-1.29-1.56c-.08-.27-.12-.67.09-1.03.44-.78 1.74-.9 2.84-.28A2.7 2.7 0 0 1 6.98 3.9c.08.27.12.66-.09 1.03-.44.78-1.75.9-2.84.28zm-1.2 11.17a1.31 1.31 0 0 1-.09-1.03c.16-.6.65-1.19 1.29-1.56 1.09-.62 2.4-.5 2.84.28.21.37.17.76.09 1.03a2.69 2.69 0 0 1-1.29 1.56c-1.1.63-2.4.5-2.84-.28z"/><path fill="#77808f" d="M6.64 18.33a4.58 4.58 0 0 0 2.19-2.72c.23-.85.16-1.72-.27-2.47l3.93-2.25c2.77 1.4 8.98 4.51 9.96 5.07 1.27.72 2.77-.57 2.77-.57l-10.3-5.9 10.3-5.88s-1.5-1.3-2.77-.57c-.98.56-7.19 3.68-9.96 5.07L8.57 5.86c.42-.75.49-1.62.26-2.46A4.57 4.57 0 0 0 6.64.67c-2.03-1.16-4.48-.72-5.46 1-.43.75-.5 1.63-.27 2.48a4.6 4.6 0 0 0 2.18 2.72c.5.29 1.03.47 1.55.57h-.01.02l.13.02c3.23.48 4.88 1.4 5.68 2.04-.8.64-2.45 1.56-5.68 2.04l-.13.01h-.02.01a5 5 0 0 0-1.55.58 4.6 4.6 0 0 0-2.18 2.72c-.23.85-.16 1.72.27 2.49.98 1.7 3.43 2.15 5.46.99zM4.05 5.2a2.7 2.7 0 0 1-1.29-1.56c-.08-.27-.12-.67.09-1.03.44-.78 1.74-.9 2.84-.28A2.7 2.7 0 0 1 6.98 3.9c.08.27.12.66-.09 1.03-.44.78-1.75.9-2.84.28zm-1.2 11.17a1.31 1.31 0 0 1-.09-1.03c.16-.6.65-1.19 1.29-1.56 1.09-.62 2.4-.5 2.84.28.21.37.17.76.09 1.03a2.69 2.69 0 0 1-1.29 1.56c-1.1.63-2.4.5-2.84-.28z"/>
        </svg>
    )
}

export default ScissorsIcon
