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
  import DesksService from '@/services/DesksService';
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
      getStatusList() {
        this.statusList = this.$store.getters.STATUSES;
      },
      getVersionList() {
        this.versionList = this.$store.getters.VERSIONS;
      },
      getPriorityList() {
        this.priorityList = this.$store.getters.PRIORITIES;
      },
      initFilterList() {
        this.filterList = this.$store.getters.FILTERS;
      },
      getTaskList() {
        this.taskList = this.$store.getters.TASKS;
      },
      getUserList() {
        this.userList = this.$store.getters.USERS;
        this.userList = this.$store.getters.USERS;
      },
      checkDeskListUser(userId) {
        if (this.deskList.length === 0) {
          return false;
        }
        else {
          for (let deskIndex in this.deskList) {
            if (this.deskList.hasOwnProperty(deskIndex)
              && this.deskList[deskIndex].hasOwnProperty('user')
              && this.deskList[deskIndex].user.hasOwnProperty('id')
              && this.deskList[deskIndex].user.id === userId) {
              return true;
            }
          }

          return false;
        }
      },
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

        /*
        * TODO: по идее должен срабатывать watch за taskList, не срабатывает, поэтому вызываем обновление стола
        * */
        this.toggleTasksShow();
        this.getDeskList();
      },
      addNewTask(newTask) {
        // в реальном приложении id и номер нужно получать из БД
        newTask.id = this.getNewTaskId();
        newTask.number = this.getRandom();

        this.taskList.push(newTask);
      },
      getNewTaskId() {
        let newTaskId;

        do {
          newTaskId = this.getRandom(0, 1000);
        }
        while (!this.checkTaskRandomId(newTaskId))

        return newTaskId;
      },
      setDraggableTaskId(id) {
        this.draggableTaskId = id;
      },
      getRandom(min, max) {
        if (min === undefined || max === undefined) {
          return null;
        }
        return Math.random() * (max - min) + min;
      },
      checkTaskRandomId(id) {
        for (let taskKey in this.taskList) {
          if(this.taskList.hasOwnProperty(taskKey) && this.taskList[taskKey].id === id) {
            return false;
          }
        }
        return true;
      },
      moveTask(taskData) {

        console.log('move task');

        let statusIndex = taskData.listIndex;
        let userId = taskData.userId;
        let draggedTaskId = this.$store.getters.DRAGGED_TASK_ID;

        let curStatus = this.getStatusByIndex(statusIndex - 1);
        let curUser;

        if (!curStatus) {
          // нет статуса
          return false;
        }

        // get user data
        curUser = this.getUserById(userId);

        if (!curUser) {
          // нет юзера
          return false;
        }

        for (let taskKey in this.taskList) {
          if (this.taskList.hasOwnProperty(taskKey) && this.taskList[taskKey].id === draggedTaskId) {

            this.taskList[taskKey].user = curUser;
            this.taskList[taskKey].status = curStatus;

            /*
            * TODO: по идее должен срабатывать watch за taskList, не срабатывает, поэтому вызываем обновление стола
            * */
            this.toggleTasksShow();
            this.getDeskList();

            console.log('Обновили');
          }
        }

      },
      getStatusByIndex(statusIndex) {
        if (this.statusList.hasOwnProperty([statusIndex])) {
          return this.statusList[statusIndex];
        }

        return null;
      },
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
      showRightForm() {
        this.isRightFormActive = true;
      },
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

      /*
      * TODO: при этом событии обновляется фильтр лист. Это какая-то внутренняя реактивность?
      * */
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
      /*bus.$on('set-drag-task', (id) => {
        this.setDraggableTaskId(id);
      });*/
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
  }
  .desk-list-container {
    max-width: 100%;
    transition: max-width 0.3s;
  }
  .desk-container.active .desk-list-container {
    max-width: calc(100% - 350px);
    transition: max-width 0.3s;
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