import { createSelector } from 'reselect';
import { selectRubrics } from 'containers/App/selectors';

/**
 * Direct selector to the programsPage state domain
 */
const selectProgramsPageDomain = () => (state) => state.get('programsPage');

/**
 * Other specific selectors
 */

const selectRecords = createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('records').toJS()
);

const selectPrograms = createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('programs').toJS()
);

const selectSelectedRecord = createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('selectedRecord')
);

const makeSelectRubricsNames = () => createSelector(
    selectRubrics,
    (rubrics) => [
        { id: -1, name: 'Все' },
        ...rubrics,
    ]
);

const makeGetPrograms = () => createSelector(
    selectPrograms,
    (programs) => {
        if (!programs || !programs.ids || !programs.byId) {
            return [];
        }

        return programs.ids.map((id) => programs.byId[id])
    }
);

const makeGetProgramsAsOptions = () => createSelector(
    selectPrograms,
    (programs) => {
        if (!programs || !programs.ids || !programs.byId) {
            return [];
        }

        return programs.ids.map((id) => {
            const program = programs.byId[id];

            return {
                label: program.name,
                value: id,
            };
        });
    }
);

const makeGetRecords = () => createSelector(
    [selectRecords, selectPrograms],
    (records, programs) => records.map((record) => (
        {
            id: record.id,
            date: record.publish_date,
            title: record.title,
            preview: record.image_preview,
            program: programs.byId[record.program_id].name,
        }
    ))
);

const makeGetSelectedRecord = () => createSelector(
    [selectRecords, selectSelectedRecord],
    (records, selected) => records.find((record) => record.id === selected)
);

/**
 * Default selector used by ProgramsPage
 */

const makeSelectProgramsPage = () => createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectProgramsPage;
export {
    selectProgramsPageDomain,
    selectRecords,
    makeSelectRubricsNames,
    makeGetRecords,
    makeGetProgramsAsOptions,
    makeGetSelectedRecord,
    makeGetPrograms,
};
