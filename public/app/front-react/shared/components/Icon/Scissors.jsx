import React from 'react'
import classNames from 'classnames'

function ScissorsIcon({ className, width, height }) {

    return (
        <svg className={classNames('icon icon_scissors', className)} xmlns="http://www.w3.org/2000/svg" width={width||'23px'} height={height||'20px'} viewBox="0 0 23 20">
            <path d="M8,4 C8,1.8 6.2,0 4,0 C1.8,0 0,1.8 0,4 C0,6.2 1.8,8 4,8 C4.6,8 5.1,7.9 5.6,7.6 L8,10 L5.6,12.4 C5.1,12.1 4.6,12 4,12 C1.8,12 0,13.8 0,16 C0,18.2 1.8,20 4,20 C6.2,20 8,18.2 8,16 C8,15.4 7.9,14.9 7.6,14.4 L10,12 L17,19 L21,19 L7.6,5.6 C7.9,5.1 8,4.6 8,4 L8,4 Z M4,6 C2.9,6 2,5.1 2,4 C2,2.9 2.9,2 4,2 C5.1,2 6,2.9 6,4 C6,5.1 5.1,6 4,6 L4,6 Z M4,18 C2.9,18 2,17.1 2,16 C2,14.9 2.9,14 4,14 C5.1,14 6,14.9 6,16 C6,17.1 5.1,18 4,18 L4,18 Z M10,9.5 C10.3,9.5 10.5,9.7 10.5,10 C10.5,10.3 10.3,10.5 10,10.5 C9.7,10.5 9.5,10.3 9.5,10 C9.5,9.7 9.7,9.5 10,9.5 L10,9.5 Z M21,1 L17,1 L11,7 L13,9 L21,1 L21,1 Z" />
        </svg>
    )
}

export default ScissorsIcon