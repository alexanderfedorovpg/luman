import React from 'react';
import PropTypes from 'prop-types';

import {
    Wrapper,
    DisplayStream,
    DisplayEmpty,
} from './style';
import LiveForm from '../LiveForm';

const Details = ({ url }) => (
    <Wrapper>
        {
            url ?
            <DisplayStream src={url} /> :
            <DisplayEmpty>
                Нет прямого эфира
            </DisplayEmpty>
        }

        <LiveForm />
    </Wrapper>
);

Details.propTypes = {
    url: PropTypes.string,
};

export default Details;
