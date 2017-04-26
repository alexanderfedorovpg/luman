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

const makeSelectRubricsNames = () => createSelector(
    selectRubrics,
    (rubrics) => [
        { id: -1, name: 'Все' },
        ...rubrics,
    ]
);

const makeGetProgramsAsOptions = () => createSelector(
    selectPrograms,
    (programs) => {
        if (!programs || !programs.ids) {
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
            date: record.updated_at ? record.updated_at : record.created_at,
            title: record.title,
            preview: record.image_preview,
            program: programs.byId[record.program_id].name,
        }
    ))
);

const makeGetSelectedRecord = () => createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('selectedRecord').toJS()
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
    makeSelectRubricsNames,
    makeGetRecords,
    makeGetProgramsAsOptions,
    makeGetSelectedRecord,
};
