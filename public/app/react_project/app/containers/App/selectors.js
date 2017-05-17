import { createSelector } from 'reselect';
import { List } from 'immutable';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
      const routingState = state.get('route'); // or state.route

      if (!routingState.equals(prevRoutingState)) {
        prevRoutingState = routingState;
        prevRoutingStateJS = routingState.toJS();
    }

      return prevRoutingStateJS;
  };
};

const selectAppDomain = () => (state) => state.get('app');

const usersMap = createSelector(
    selectAppDomain(),
    (app) => app.getIn(['users', 'data'])
);

const selectEditors = createSelector(
    selectAppDomain(),
    usersMap,
    (app, users) => app.getIn(['users', 'editors'])
        .map((value) => users.get(`${value}`))
        .map((value) => (value && value.toJS) ? value.toJS() : value)
);

const selectUsersMap = createSelector(
    selectAppDomain(),
    app => app.getIn(['users', 'data']).toJS()
);

const selectUsers = createSelector(
    selectAppDomain(),
    usersMap,
    (app, users) => app.getIn(['users', 'data']).toJS()
);

const selectCurrentUser = createSelector(
    selectAppDomain(),
    (app) => {
        const user = app.getIn(['current', 'data']);

        if (user && user.toJS) {
            return user.toJS();
        }

        return user;
    }
);

const selectRubrics = createSelector(
    selectAppDomain(),
    (app) => app.getIn(['rubrics', 'data']).toJS()
);

const selectRubricsList = createSelector(
    selectAppDomain(),
    (app) => app.getIn(['rubrics', 'data'])
);

const selectMenuExpandedStatus = createSelector(
    selectAppDomain(),
    (app) => app.get('menuOpen')
);

const getCurrentUserData = createSelector(
    selectAppDomain(),
    (app) => app.getIn(['current', 'data'])
);

const makeSelectPreloader = () => createSelector(
    selectAppDomain(),
    (app) => app.get('preloader')
);

const makeSelectInfo = () => createSelector(
    selectAppDomain(),
    (app) => app.get('infoModalText')
);

const makeSelectPrograms = () => createSelector(
    selectAppDomain(),
    (app) => app.get('programs')
);

const makeGetGroups = () => createSelector(
    selectAppDomain(),
    (app) => app.get('groups')
);

const makeGetProgramsArray = () => createSelector(
    makeSelectPrograms(),
    (programsMap) => {
        const programs = programsMap.toJS();

        if (!programs || !programs.ids || !programs.byId) {
            return [];
        }

        return programs.ids.map((id) => programs.byId[id]);
    }
);

const selectLocationState = makeSelectLocationState()

export {
    selectEditors,
    selectUsers,
    selectCurrentUser,
    getCurrentUserData,
    selectUsersMap,
    selectRubrics,
    selectRubricsList,
    makeSelectLocationState,
    selectMenuExpandedStatus,
    makeSelectPreloader,
    makeSelectInfo,
    makeSelectPrograms,
    makeGetProgramsArray,
    selectLocationState,
    makeGetGroups
};
