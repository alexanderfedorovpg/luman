
import { fromJS } from 'immutable';
import livePageReducer from '../reducer';

describe('livePageReducer', () => {
  it('returns the initial state', () => {
    expect(livePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
