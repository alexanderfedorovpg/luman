
export const selectRubricsDomain = state => state.rubrics

export const selectRubricsData = state => selectRubricsDomain(state).data

export const selectRubrics = state => (
    selectNewsDomain(state).map(id => selectRubricsData(state)[id])
)
