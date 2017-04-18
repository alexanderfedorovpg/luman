import React from 'react'
import classNames from 'classnames'

import './style.scss'

function FromEnter({ data, className }) {

    return (
        <div className={classNames('from-enter', className)}>
            <a className="from-enter__link from-enter__link from-enter__link_position" href="javascript:void(0)">
                <img className="from-enter__img" src={data.img} alt="" alt="" role="presentation" />
                <span className="from-enter__time-keeping">
                    <img className="from-enter__ico" src={data.time_keeping_img} alt="" role="presentation" />
                    <span className="from-enter__keeping">
                        {data.time_keeping}
                    </span>
                </span>
            </a>
            <div className="from-enter__info">
                <a className="from-enter__link" href="javascript:void(0)">
                    {data.title}
                </a>
                <p className="from-enter__category">
                    {`${data.category} `}
                    <span className="from-enter__time-add">
                        {data.time_add}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default FromEnter
