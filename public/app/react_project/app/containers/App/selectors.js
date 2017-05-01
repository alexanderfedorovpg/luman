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

const selectAppDomain = (state) => state.get('app');

const usersMap = createSelector(
    selectAppDomain,
    (app) => app.getIn(['users', 'data'])
);

const selectEditors = createSelector(
    selectAppDomain,
    usersMap,
    (app, users) => app.getIn(['users', 'editors'])
        .map((value) => users.get(`${value}`))
        .map((value) => (value && value.toJS) ? value.toJS() : value)
);

const selectUsersMap = createSelector(
    selectAppDomain,
    usersMap,
    (app, users) => app.getIn(['users', 'data']).toJS()
);

const selectUsers = createSelector(
    selectAppDomain,
    usersMap,
    (app, users) => app.getIn(['users', 'data']).toJS()
);

const selectCurrentUser = createSelector(
    selectAppDomain,
    usersMap,
    (app, users) => {
        const user = app.getIn(['current', 'data']);

        if (user && user.toJS)
            {return user.toJS()};

        return user;
    }
);

const selectRubrics = createSelector(
    selectAppDomain,
    (app) => app.getIn(['rubrics', 'data']).toJS()
);

const selectMenuExpandedStatus = createSelector(
    selectAppDomain,
    (app) => app.get('menuOpen')
);

const makeSelectPreloader = () => createSelector(
    selectAppDomain,
    (app) => app.get('preloader')
);

const makeSelectInfo = () => createSelector(
    selectAppDomain,
    (app) => app.get('infoModalText')
);

const makeSelectPrograms = () => createSelector(
    selectAppDomain,
    (app) => app.get('programs').toJS()
);

export {
    selectEditors,
    selectUsers,
    selectCurrentUser,
    selectUsersMap,
    selectRubrics,
    makeSelectLocationState,
    selectMenuExpandedStatus,
    makeSelectPreloader,
    makeSelectInfo,
    makeSelectPrograms,
};
