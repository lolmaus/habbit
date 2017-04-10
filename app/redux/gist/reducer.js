import runReducer    from 'habbit/redux/_utils/run-reducer';
import initialState from './initial-state';



const subreducers = {
  RDX_GIST_RESTORE (state, {id}) {
    return {
      id,
      isFetching: false
    }
  },
}



export default function tasksReducer (state = initialState, action) {
  return runReducer(subreducers, state, action);
}
