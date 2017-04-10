
import { fromJS } from 'immutable';
import feedPageReducer from '../reducer';

describe('feedPageReducer', () => {
  it('returns the initial state', () => {
    expect(feedPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
