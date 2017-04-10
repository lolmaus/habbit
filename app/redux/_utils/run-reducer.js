export default function runReducer (reducers, state, action) {
  const reducer = reducers[action.type];

  return reducer === undefined
    ? state
    : reducer(state, action);
}
