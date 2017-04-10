import { createSelector } from 'reselect'

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
    app => app.getIn(['users', 'data'])
)

const selectEditors = createSelector(
    selectAppDomain,
    usersMap,
    (app, users) => app.getIn(['users', 'editors'])
        .map(value => users.get(`${value}`))
        .map(value => (value && value.toJS) ? value.toJS() : value)
)

export {
    selectEditors,
    makeSelectLocationState,
}
