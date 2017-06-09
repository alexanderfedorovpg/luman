import { createSelector } from 'reselect';
import moment from 'moment';
import { makeSelectPrograms, makeGetProgramsArray } from '../App/selectors';

/**
 * Direct selector to the programsPage state domain
 */
const selectProgramsPageDomain = () => (state) => state.get('programsPage');

/**
 * Other specific selectors
 */

const selectRecords = createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('records')
);

const selectSelectedRecord = createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('selectedRecord')
);

const makeSelectProgramsNames = () => createSelector(
    makeGetProgramsArray(),
    (programs) => [
        { value: -1, label: 'Все' },
        ...programs.map(({ id, name }) => ({ value: id, label: name })),
    ]
);

const makeGetSelectedProgram = () => createSelector(
    selectProgramsPageDomain(),
    (state) => state.get('selectedProgram')
);

const makeGetRecords = () => createSelector(
    [selectRecords, makeSelectPrograms()],
    (records, programs) => records.toJS().map((record) => (
        {
            id: record.id,
            date: record.publish_date,
            title: record.title,
            preview: record.video && record.video.preview,
            program: programs.toJS().byId[record.program_id].name,
        }
    ))
);

const makeGetSelectedRecord = () => createSelector(
    [selectRecords, selectSelectedRecord],
    (records, selected) => {
        const target = records.toJS().find((record) => record.id === selected);

        if (!target) {
            return {
                publish_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            };
        }

        return {
            ...target,
            video: target.video ? target.video.url : null,
            video_preview: target.video ? target.video.preview : null,
        };
    }
);

const makeCheckCanSave = () => createSelector(
    selectRecords,
    (records) => records.toJS().some((record) => record.is_published === 0)
);

const makeGetRecordsType = () => createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('recordsType')
);

const makeGetLoadingState = () => createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('loading')
);

const makeGetAllRecordsUploaded = () => createSelector(
    selectProgramsPageDomain(),
    (substate) => substate.get('allRecordsUploaded')
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
    makeGetSelectedRecord,
    makeCheckCanSave,
    makeGetRecordsType,
    makeGetSelectedProgram,
    makeGetAllRecordsUploaded,
    makeGetLoadingState,
};
