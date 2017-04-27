import { createSelector } from 'reselect'
import { List } from 'immutable'

import {
    selectUsersMap,
    selectRubrics
} from 'containers/App/selectors'

const selectStatsPageDomain = (state) => state.get('statsPage')

const selectStatsData = createSelector(
    selectStatsPageDomain,
    root => root.get('statsdata').toJS()
)

//
// const selectData = createSelector()(
//    console.log('selectDat!!!!!!!a', arguments)
// )
// export default selectData;
// export {
//     selectData,
// }

export {
    selectStatsData
}
