import runReducer    from 'habbit/redux/_utils/run-reducer';
import deleteAtIndex from 'habbit/utils/delete-at-index';

import initialState from './initial-state';



const subreducers = {
  // CREATE_TASK (tasks, {task}) {
  //     return [
  //       ...tasks,
  //       task
  //     ]
  // },



  DELETE_TASK (tasks, {index}) {
      return deleteAtIndex(tasks, index)
  },



  UPDATE_TASK_TITLE_AT_INDEX (tasks, {index, title}) {
    tasks = tasks.slice();

    tasks[index] = {
      ...tasks[index],
      title
    };

    return tasks;
  }
}



export default function tasksReducer (tasks = initialState, action) {
  return runReducer(subreducers, tasks, action);
}
