import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InlineFilter from 'components/InlineFilter';
import { Wrapper } from './style';
import {
    makeSelectProgramsNames,
    makeGetSelectedProgram,
} from '../selectors';
import { changeProgram } from '../actions';

const Programs = ({ selected, programs, ...props }) => (
    <Wrapper>
        {
            !!programs &&
            <InlineFilter
                items={programs}
                value={[selected]}
                onChange={props.changeProgram}
            />
        }
    </Wrapper>
);

Programs.propTypes = {
    selected: PropTypes.number,
    changeProgram: PropTypes.func,
    programs: InlineFilter.propTypes.items,
};

const mapStateToProps = createStructuredSelector({
    selected: makeGetSelectedProgram(),
    programs: makeSelectProgramsNames(),
});

function mapDispatchToProps(dispatch) {
    return {
        changeProgram: (id) => dispatch(changeProgram(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
