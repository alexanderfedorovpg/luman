
import { fromJS } from 'immutable';
import editionPageReducer from '../reducer';

describe('editionPageReducer', () => {
  it('returns the initial state', () => {
    expect(editionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
