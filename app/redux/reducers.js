const {combineReducers} = window.Redux;

import session from 'habbit/redux/session/reducer';
import tasks   from 'habbit/redux/tasks/reducer';



export default combineReducers({
  session,
  tasks,
});
