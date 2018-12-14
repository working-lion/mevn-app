import Vue from 'vue';
import Vuex from 'vuex';

// services
import FileServices from '@/services/FileService';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tasks: Array,
    statuses: Array,
    filters: Object,
    versions: Array,
    priorities: Array,
    types: Array,
    users: Array,
    // drag-drop
    draggedTaskId: null,
  },
  getters: {
    STATUSES: state => {
      return state.statuses;
    },
    FILTERS: state => {
      return state.filters;
    },
    VERSIONS: state => {
      return state.versions;
    },
    PRIORITIES: state => {
      return state.priorities;
    },
    TYPES: state => {
      return state.types;
    },
    TASKS: state => {
      return state.tasks;
    },
    USERS: state => {
      return state.users
    },
    DRAGGED_TASK_ID: state => {
      return state.draggedTaskId;
    },
  },
  mutations: {
    // tasks
    SET_TASKS: (state, taskList) => {
      state.tasks = taskList;
    },
    ADD_TASK: (state, newTask) => {
      state.tasks.push(newTask);
    },
    // status
    SET_STATUSES: (state, statuses) => {
      state.statuses = statuses;
    },
    // types
    SET_TYPES: (state, types) => {
      state.types = types;
    },
    // filter
    SET_FILTERS: (state, filters) => {
      state.filters = filters;
    },
    UPDATE_FILTERS_ITEM: (state, filterItem) => {

      if (filterItem.hasOwnProperty('id')) {

        for (let optionKey in state.filters) {
          if (state.filters.hasOwnProperty(optionKey)) {

            for (let itemKey in state.filters[optionKey]) {
              if (state.filters[optionKey].hasOwnProperty(itemKey)
                && state.filters[optionKey][itemKey].hasOwnProperty('id')
                && filterItem.id === state.filters[optionKey][itemKey].id) {

                if(filterItem.hasOwnProperty('isActive')) {

                  // так как сначала срабатывает клик, а потом обновляется поле, которое привязано к чекбоксу через
                  // model, то приходит элемент фильтра до изменения
                  state.filters[optionKey][itemKey].isActive = !filterItem.isActive;
                }
                else {

                  state.filters[optionKey][itemKey].isActive = true;
                }
              }

              return true;
            }
          }
        }
        return false;
      }
    },
    // versions
    SET_VERSIONS: (state, versions) => {
      state.versions = versions;
    },
    // priorities
    SET_PRIORITIES: (state, priorities) => {
      state.priorities = priorities;
    },
    // users
    SET_USERS: (state, users) => {
      state.users = users;
    },
    DRAGGED_TASK_ID: (state, taskId) => {
      state.draggedTaskId = taskId;
    },
  },
  actions: {
    // tasks
    GET_TASKS: (context, tasks) => {
      if (tasks.length > 0) {
        context.commit('SET_TASKS', statuses);
      }
      else {
        context.commit('SET_TASKS', FileServices.getTaskList());
      }
    },
    // statuses
    GET_STATUSES: (context, statuses) => {
      if (statuses.length > 0) {
        context.commit('SET_STATUSES', statuses);
      }
      else {
        context.commit('SET_STATUSES', FileServices.getTaskStatusList());
      }
    },
    // types
    GET_TYPES: (context, types) => {
      if (types.length > 0) {
        context.commit('SET_TYPES', types);
      }
      else {
        context.commit('SET_TYPES', FileServices.getTaskTypeList());
      }
    },
    // filters
    GET_FILTERS: (context, filters) => {
      if (filters.hasOwnProperty('version')
        /*&& filters.hasOwnProperty('priority')
        && filters.hasOwnProperty('type')*/
      ) {
        context.commit('SET_FILTERS', filters);
      }
    },
    RUN_UPDATE_FILTERS_ITEM: (context, data) => {
      context.commit('UPDATE_FILTERS_ITEM', data);
    },
    // versions
    GET_VERSIONS: (context, versions) => {
      if (versions.length > 0) {
        context.commit('SET_VERSIONS', versions);
      }
      else {
        context.commit('SET_VERSIONS', FileServices.getVersionList());
      }
    },
    // priorities
    GET_PRIORITIES: (context, priorities) => {
      if (priorities.length > 0) {
        context.commit('SET_PRIORITIES', priorities);
      }
      else {
        context.commit('SET_PRIORITIES', FileServices.getPriorityList());
      }
    },
    // users
    GET_USERS: (context, users) => {
      if (users.length > 0) {
        context.commit('SET_USERS', users);
      }
      else {
        context.commit('SET_USERS', FileServices.getUserList());
      }
    },
    SET_DRAGGED_TASK_ID: (context, taskId) => {
      if (taskId) {
        context.commit('DRAGGED_TASK_ID', taskId);
      }
      else {
        context.commit('DRAGGED_TASK_ID', null);
      }
    },

  },
});