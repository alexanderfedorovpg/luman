
import { fromJS } from 'immutable';
import programsPageReducer from '../reducer';

describe('programsPageReducer', () => {
  it('returns the initial state', () => {
    expect(programsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
