import runReducer    from 'habbit/redux/_utils/run-reducer';
import initialState from './initial-state';



const subreducers = {
  RDX_ROUTE_GIST_UPDATE_USER_INPUT (state, {userInput}) {
    return {
      ...state,
      userInput
    }
  },
}



export default function tasksReducer (state = initialState, action) {
  return runReducer(subreducers, state, action);
}
