import React from 'react';
import { FormattedTime } from 'react-intl';

import Socials from 'components/Socials';

import './style.scss';

function Timeline({ data }) {

    return (
        <div className="timeline">
            {data && data.map((v, i) => (
                <div className="timeline__item" key={i}>
                    <div className="timeline__date">
                        <time className="timeline__time">
                            <FormattedTime
                                value={v.publish_date}
                                hour="2-digit"
                                minute="2-digit"
                            />
                        </time>
                    </div>
                    <div className="timeline__cnt">
                        <p className="timeline__title">
                            {v.body}
                        </p>
                    </div>
                    <Socials />
                </div>
            ))}
        </div>
    )
}

export default Timeline
