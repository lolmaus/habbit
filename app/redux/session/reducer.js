import runReducer    from 'habbit/redux/_utils/run-reducer';
import initialState from './initial-state';



const subreducers = {
  RDX_SESSION_START_AUTHENTICATION (/*sessionState*/) {
    return {
      isAuthenticated  : false,
      isAuthenticating : true,
      data             : null,
    }
  },

  RDX_SESSION_AUTHENTICATE (sessionState, {data}) {
    return {
      isAuthenticated  : true,
      isAuthenticating : false,
      data
    }
  },

  RDX_SESSION_INVALIDATE (/*sessionState*/) {
    return {
      isAuthenticated  : false,
      isAuthenticating : false,
      data             : null
    }
  },
}



export default function tasksReducer (sessionState = initialState, action) {
  return runReducer(subreducers, sessionState, action);
}
