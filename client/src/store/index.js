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
  },
  getters: {
    /**
     * Возвращает список статусов задач
     * @param {Object} state - состояние
     * @returns {Array}
     */
    STATUSES: state => {
      return state.statuses;
    },
    /**
     * Возвращает список фильтров
     * @param {Object} state - состояние
     * @returns {Array}
     */
    FILTERS: state => {
      return state.filters;
    },
    /**
     * Возвращает список версий приложения
     * @param {Object} state - состояние
     * @returns {Array}
     */
    VERSIONS: state => {
      return state.versions;
    },
    /**
     * Возвращает список приоритетов задач
     * @param {Object} state - состояние
     * @returns {Array}
     */
    PRIORITIES: state => {
      return state.priorities;
    },
    /**
     * Возвращает список типов задач
     * @param {Object} state - состояние
     * @returns {Array}
     */
    TYPES: state => {
      return state.types;
    },
    /**
     * Возвращает список задач
     * @param {Object} state - состояние
     * @returns {Array}
     */
    TASKS: state => {
      return state.tasks;
    },
    /**
     * Возвращает список исполнителей
     * @param {Object} state - состояние
     * @returns {Array}
     */
    USERS: state => {
      return state.users
    },
  },
  mutations: {
    /**
     * Устанавливает список задач
     * @param {Object} state - состояние
     * @param {Array} taskList - список задач
     */
    SET_TASKS: (state, taskList) => {
      state.tasks = taskList;
    },
    /**
     * Устанавливает список статусов задач
     * @param {Object} state - состояние
     * @param {Array} statuses - список статусов
     */
    SET_STATUSES: (state, statuses) => {
      state.statuses = statuses;
    },
    /**
     * Устанавливает список типов задач
     * @param {Object} state - состояние
     * @param {Array} types - список типов
     */
    SET_TYPES: (state, types) => {
      state.types = types;
    },
    /**
     * Устанавливает список фильтров
     * @param {Object} state - состояние
     * @param {Array} filters - список фильтров
     */
    SET_FILTERS: (state, filters) => {
      state.filters = filters;
    },
    /**
     * Устанавливает список версий задач
     * @param {Object} state - состояние
     * @param {Array} versions - список версий
     */
    SET_VERSIONS: (state, versions) => {
      state.versions = versions;
    },
    /**
     * Устанавливает список приоритетов задач
     * @param {Object} state - состояние
     * @param {Array} priorities - список версий
     */
    SET_PRIORITIES: (state, priorities) => {
      state.priorities = priorities;
    },
    /**
     * Устанавливает список исполнителей задач
     * @param {Object} state - состояние
     * @param {Array} users - список версий
     */
    SET_USERS: (state, users) => {
      state.users = users;
    },
  },
  actions: {
    /**
     * Вызывает мутацию изменения списка задач
     * @param context
     * @param {Array} tasks
     */
    GET_TASKS: (context, tasks) => {
      if (tasks.length > 0) {
        context.commit('SET_TASKS', tasks);
      }
      else {
        context.commit('SET_TASKS', FileServices.getTaskList());
      }
    },
    /**
     * Вызывает мутацию изменения списка статусов задач
     * @param context
     * @param {Array} statuses
     */
    GET_STATUSES: (context, statuses) => {
      if (statuses.length > 0) {
        context.commit('SET_STATUSES', statuses);
      }
      else {
        context.commit('SET_STATUSES', FileServices.getTaskStatusList());
      }
    },
    /**
     * Вызывает мутацию изменения списка типов задач
     * @param context
     * @param {Array} types
     */
    GET_TYPES: (context, types) => {
      if (types.length > 0) {
        context.commit('SET_TYPES', types);
      }
      else {
        context.commit('SET_TYPES', FileServices.getTaskTypeList());
      }
    },
    /**
     * Вызывает мутацию изменения списка фильтров
     * @param context
     * @param {Array} filters
     */
    GET_FILTERS: (context, filters) => {
      if (filters.hasOwnProperty('version')
        && filters.hasOwnProperty('priority')
        && filters.hasOwnProperty('type')) {
        context.commit('SET_FILTERS', filters);
      }
    },
    /**
     * Вызывает мутацию изменения списка версий задач
     * @param context
     * @param {Array} versions
     */
    GET_VERSIONS: (context, versions) => {
      if (versions.length > 0) {
        context.commit('SET_VERSIONS', versions);
      }
      else {
        context.commit('SET_VERSIONS', FileServices.getVersionList());
      }
    },
    /**
     * Вызывает мутацию изменения списка приоритетов задач
     * @param context
     * @param {Array} priorities
     */
    GET_PRIORITIES: (context, priorities) => {
      if (priorities.length > 0) {
        context.commit('SET_PRIORITIES', priorities);
      }
      else {
        context.commit('SET_PRIORITIES', FileServices.getPriorityList());
      }
    },
    /**
     * Вызывает мутацию изменения списка исполнителей
     * @param context
     * @param {Array} users
     */
    GET_USERS: (context, users) => {
      if (users.length > 0) {
        context.commit('SET_USERS', users);
      }
      else {
        context.commit('SET_USERS', FileServices.getUserList());
      }
    },
  },
});