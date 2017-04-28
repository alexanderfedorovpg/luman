import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Tags from 'components/Tags';
import { Wrapper } from './style';
import makeSelectProgramsPage, {
    makeSelectRubricsNames,
} from '../selectors';
import { changeRubric } from '../actions';

const Rubrics = ({ ProgramsPage: { rubric }, rubrics, ...props }) => (
    <Wrapper>
        {
            !!rubrics &&
            <Tags
                type="radio"
                data={rubrics}
                value={[rubric]}
                onChange={props.changeRubric}
            />
        }
    </Wrapper>
);

Rubrics.propTypes = {
    ProgramsPage: PropTypes.object,
    changeRubric: PropTypes.func,
    rubrics: Tags.propTypes.data,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    rubrics: makeSelectRubricsNames(),
});

function mapDispatchToProps(dispatch) {
    return {
        changeRubric: (id) => dispatch(changeRubric(id[0])),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rubrics);
