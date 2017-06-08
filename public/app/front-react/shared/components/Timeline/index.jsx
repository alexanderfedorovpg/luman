import React from 'react';
import { FormattedTime } from 'react-intl';

import Socials from 'components/Socials';

import './style.scss';

function Timeline({ data }) {

    return (
        <div className="timeline">
            {data && data.map(v => (
                <div className="timeline__item" key={v.id}>
                    <div className="timeline__date">
                        <time className="timeline__time">
                            <FormattedTime
                                value={Date.now()}
                                hour="2-digit"
                                minute="2-digit"
                            />
                        </time>
                    </div>
                    <div className="timeline__cnt">
                        <p className="timeline__title">
                            title
                        </p>
                    </div>
                    <Socials />
                </div>
            ))}
        </div>
    )
}

export default Timeline
