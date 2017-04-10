export default {
  DELETE_TASK (type, index) {
    return {
      type,
      index
    }
  },

  UPDATE_TASK_TITLE_AT_INDEX (type, index, title) {
    return {
      type,
      index,
      title
    }
  }
}
