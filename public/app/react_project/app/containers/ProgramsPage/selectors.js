import { createSelector } from 'reselect';
import moment from 'moment';
import { makeSelectPrograms } from '../App/selectors';

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

const selectSelectedRecord = createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('selectedRecord')
);


const makeGetProgramsArray = () => createSelector(
    makeSelectPrograms(),
    (programs) => {
        if (!programs || !programs.ids || !programs.byId) {
            return [];
        }

        return programs.ids.map((id) => programs.byId[id]);
    }
);

const makeSelectProgramsNames = () => createSelector(
    makeGetProgramsArray(),
    (programs) => [
        { id: -1, name: 'Все' },
        ...programs,
    ]
);

const makeGetProgramsAsOptions = () => createSelector(
    makeSelectPrograms(),
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
    [selectRecords, makeSelectPrograms()],
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
    (records, selected) => {
        const target = records.find((record) => record.id === selected);

        if (!target) {
            return {
                publish_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            };
        }

        return target;
    }
);

const makeCheckCanSave = () => createSelector(
    selectRecords,
    (records) => records.some((record) => record.is_published === 0)
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
    makeSelectProgramsNames,
    makeGetRecords,
    makeGetProgramsAsOptions,
    makeGetSelectedRecord,
    makeGetProgramsArray,
    makeCheckCanSave,
};
