<template>
  <div class="body">

    <header-block
      :status-list="statusList"
    ></header-block>

    <div class="content">
      <div class="desk-container" :class="{active: isRightFormActive}">
        <div class="desk-list-container">
          <div class="status-list-block">
            <ul class="status-list">
              <li class="status-item"
                  v-for="status in statusList"
                  :key="status.id">
                {{ status.name }}
              </li>
            </ul>
          </div>

          <div class="desk-list">
            <desk-item
              v-for="(desk, deskIndex) in deskList"
              :key="deskIndex"
              :desk="desk"
              :status-list="statusList"
            ></desk-item>
          </div>
        </div>

        <!--Форма показа / редактирования задачи -->
        <show-task-right></show-task-right>

      </div>
    </div>

    <footer-block></footer-block>

    <!--Форма добавления задачи -->

    <add-task-form></add-task-form>

  </div>
</template>

<script>
  // bus
  import {bus} from '@/main';

  // Components
  import headerBlock from '@/components/Header';
  import footerBlock from '@/components/Footer';
  import DeskItem from '@/components/desks/DeskItem';
  import AddTaskForm from '@/components/forms/AddTaskForm';
  import ShowTaskRight from '@/components/forms/ShowTaskRight';

  // Services
  import FileService from '@/services/FileService';

  export default {
    name: 'start-page',
    components: {
      headerBlock,
      footerBlock,
      DeskItem,
      AddTaskForm,
      ShowTaskRight,
    },
    data() {
      return {
        taskList: [],
        userList: [],
        statusList: [],
        versionList: [],
        priorityList: [],
        filterList: {},
        deskList: {},
        isEditTaskModalVisible: false,
        draggableTaskId: null,
        isRightFormActive: false,
      }
    },
    methods: {
      /**
       * Получает список статусов задач из хранилища
       */
      getStatusList() {
        this.statusList = this.$store.getters.STATUSES;
      },
      /**
       * Получает список версий приложения из хранилища
       */
      getVersionList() {
        this.versionList = this.$store.getters.VERSIONS;
      },
      /**
      * Получает список приоритетов задач из хранилища
      * */
      getPriorityList() {
        this.priorityList = this.$store.getters.PRIORITIES;
      },
      /**
       * Получает список доступных фильтров из хранилища
       * */
      initFilterList() {
        this.filterList = this.$store.getters.FILTERS;
      },
      /**
       * Получает список задач из хранилища
       * */
      getTaskList() {
        this.taskList = this.$store.getters.TASKS;
      },
      /**
       * Получает список исполнителей из хранилища
       * */
      getUserList() {
        this.userList = this.$store.getters.USERS;
        this.userList = this.$store.getters.USERS;
      },
      /**
       * Проверяет, есть ли в списке пользователь с данным id
       * @param {number} userId - id исполнителя
       * */
      checkDeskListUser(userId) {
        if (this.deskList.length === 0) {
          return false;
        }
        else {
          for (let deskIndex in this.deskList) {
            if (this.deskList.hasOwnProperty(deskIndex)
              && this.deskList[deskIndex].hasOwnProperty('user')
              && this.deskList[deskIndex].user.hasOwnProperty('id')
              && +this.deskList[deskIndex].user.id === +userId) {
              return true;
            }
          }

          return false;
        }
      },
      /**
       * Обновляет список досок по списку задач (разбиение по исполнителям и статусам)
       * */
      getDeskList() {
        this.deskList = {};

        if (this.taskList.hasOwnProperty('length') && this.taskList.length > 0
          && this.statusList.hasOwnProperty('length') && this.statusList.length > 0) {

          for (let taskIndex in this.taskList) {
            if (this.taskList.hasOwnProperty(taskIndex)) {

              let curUserId = this.taskList[taskIndex].user.id;

              // если юзера нет, то добавляем объект в массив
              if (!this.checkDeskListUser(curUserId)) {

                let newDeskItem = {
                  user: this.taskList[taskIndex].user,
                  taskList: []
                };

                newDeskItem.taskList.push(this.taskList[taskIndex]);

                this.deskList[curUserId] = newDeskItem;
              }
              //если задачи юзера уже есть
              else {
                this.deskList[curUserId].taskList.push(this.taskList[taskIndex]);
              }
            }
          }
        }
      },
      /**
       * Проверяет, нужно ли показывать задачу, исходя из включенных фильтров
       * @param {Object} task - задача
       * @param {Object} activeGroupsFilters - фильтры
       */
      isShownTask(task, activeGroupsFilters) {
        const GROUP_ID_KEY = 'id';
        const needToShow = Object
          .keys(activeGroupsFilters)
          .reduce((groupPattern, group) => {
            const taskGroupValue = task[group] && task[group][GROUP_ID_KEY];
            const filtersPattern = activeGroupsFilters[group].reduce((pattern, filter) => {
              // Филтры внутри одной группы применяются через OR
              pattern = pattern || filter[GROUP_ID_KEY] === taskGroupValue;

              return pattern;
            }, false);

            // Филтры по разным группам применяются через AND
            groupPattern = groupPattern && filtersPattern;

            return groupPattern;
          }, true);

        return needToShow;
      },

      /**
       * Переключает видимость задач на доске
       */
      toggleTasksShow() {
        const activeGroupsFilters = Object
          .keys(this.filterList)
          .reduce((memo, groupName) => {
            const activeFilters = this.filterList[groupName].filter(filter => filter.isActive);

            if (activeFilters.length) {
              memo[groupName] = activeFilters;
            }

            return memo;
          }, {});

        for (const task of this.taskList) {
          task.show = this.isShownTask(task, activeGroupsFilters);
        }
      },
      /**
       * Изменяет данные задачи
       * @param {Object} task - задача
       */
      editTask(task) {
        for (const taskKey in this.taskList) {
          if (this.taskList.hasOwnProperty(taskKey) && this.taskList[taskKey].id === task.id) {

            Object.keys(this.taskList[taskKey]).reduce((memo, propKey) => {
              this.taskList[taskKey][propKey] = task[propKey];

              return memo;
            }, null);

            break;
          }
        }

        this.toggleTasksShow();
        this.getDeskList();
      },
      /**
       * Добавляет новую задачи в список задач
       * @param {Object} newTask - задача
       */
      addNewTask(newTask) {
        // в реальном приложении id и номер нужно получать из БД
        newTask.id = this.getNewTaskId();
        newTask.number = 'ATGSM-' + this.getRandom(0, 1000);

        this.taskList.push(newTask);
      },
      /**
       * Определяет случайный id новой задачи (в рабочей версии id задачи необходимо получать из БД)
       * @returns {number}
       */
      getNewTaskId() {
        let newTaskId;

        do {
          newTaskId = this.getRandom(0, 1000);
        }
        while (!this.checkTaskRandomId(newTaskId))

        return newTaskId;
      },
      /**
       * Вычисляет случайное число
       * @param {number} min - минимум
       * @param {number} max - максимум
       * @returns {number}
       */
      getRandom(min, max) {
        if (min === undefined || max === undefined) {
          return null;
        }

        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);

        return rand;
      },
      /**
       * Проверяет, если ли в списке задач задача с передаваемым id
       * @param {number} id - id задачи
       * @returns {boolean}
       */
      checkTaskRandomId(id) {
        for (let taskKey in this.taskList) {
          if(this.taskList.hasOwnProperty(taskKey) && this.taskList[taskKey].id === id) {
            return false;
          }
        }
        return true;
      },
      /**
       * Обновляет данные задачи (срабатывает при перетаскивании задачи в другой стоблец)
       * @param {Object} taskData - данные задачи (id, статус, исполнитель)
       * @returns {boolean}
       */
      moveTask(taskData) {

        let draggedTaskId = taskData.movedTaskId,
          statusIndex = taskData.listIndex,
          userId = taskData.userId;

        let curStatus = this.getStatusByIndex(statusIndex - 1);
        let curUser;

        if (!curStatus) {
          // нет статуса
          console.log('Ошибка! Не найден статус');
          return false;
        }

        curUser = this.getUserById(userId);

        if (!curUser) {
          // нет юзера
          console.log('Ошибка! Не найден исполнитель');
          return false;
        }

        for (let taskKey in this.taskList) {
          if (this.taskList.hasOwnProperty(taskKey) && +this.taskList[taskKey].id === +draggedTaskId) {

            this.taskList[taskKey].user = curUser;
            this.taskList[taskKey].status = curStatus;

            this.toggleTasksShow();
            this.getDeskList();

            return true;
          }
        }

        return false;

      },
      /**
       * Получает данные о статусе по id статуса
       * @param {number} statusIndex - индекс статуса в массиве статусов
       * @returns {Object | null}
       */
      getStatusByIndex(statusIndex) {
        if (this.statusList.hasOwnProperty([statusIndex])) {
          return this.statusList[statusIndex];
        }

        return null;
      },
      /**
       * Получает данные об исполнителе по его id
       * @param {number} userId - id исполнителя
       * @returns {Object | null}
       */
      getUserById(userId) {
        if (this.userList.length > 0) {

          for (let userKey in this.userList) {
            if (this.userList.hasOwnProperty(userKey) && this.userList[userKey].id === userId) {
              return this.userList[userKey];
            }
          }

          return null;
        }
      },
      /**
       * Открывает форму, расположенную на правой стороне
       */
      showRightForm() {
        this.isRightFormActive = true;
      },
      /**
       * Закрывает форму, расположенную на правой стороне
       */
      hideRightForm() {
        this.isRightFormActive = false;
      }
    },
    created: function () {
      this.getUserList();
      this.getStatusList();
      this.getVersionList();
      this.getPriorityList();
      this.initFilterList();
      this.getTaskList();

      // bus
      bus.$on('apply-filter', () => {
        this.toggleTasksShow();
      });
      bus.$on('edit-task', (task) => {
        this.editTask(task);
      });
      bus.$on('add-new-task', (newTask) => {
        this.addNewTask(newTask);
      });
      bus.$on('move-task', (taskData) => {
        this.moveTask(taskData);
      });
      bus.$on('open-task-right', () => {
        this.showRightForm();
      });
      bus.$on('close-right-form', () => {
        this.hideRightForm();
      });
    },
    watch: {
      taskList: function () {
        this.getDeskList();
      }
    }
  }
</script>

<style>
  .desk-container {
    position: relative;
    overflow-x: hidden;
    display: flex;
  }
  .desk-list-container {
    min-width: 100%;
    transition: min-width 0.3s;
    padding-bottom: 10px;
  }
  .desk-container.active .desk-list-container {
    min-width: calc(100% - 350px);
    transition: min-width 0.3s;
  }
  .status-list {
    margin: 0;
    padding: 15px 0;
    list-style: none;
    display: flex;
  }
  .status-list li {
    padding-bottom: 10px;
    border-bottom: 2px solid #fff;
    margin: 0 5px;
    flex-basis: 100%;
    flex-grow: 1;
  }
</style>