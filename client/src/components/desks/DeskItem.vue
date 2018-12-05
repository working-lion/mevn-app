<template>
  <div class="desk-item">

    <div class="desk-header">
      <div class="desk-name" v-if="desk.hasOwnProperty('user')">{{ desk.user.name }}</div>
    </div>

    <div class="column-list" v-if="desk.hasOwnProperty('taskList') && desk.taskList.length > 0">
      <task-list
        v-for="(curTaskList, curTaskListIndex) in taskListByStatus"
        :key="curTaskListIndex"
        :task-list="curTaskList"
      ></task-list>
    </div>

  </div>
</template>

<script>
  // Components
  import taskList from '@/components/tasks/TaskList'
  import modal from '@/components/forms/ModalForm';


  export default {
    name: 'desk-item',
    components: {
      taskList,
      modal
    },
    props: {
      desk: {
        type: Object
      },
      statusList: {
        type: Array
      }
    },
    data() {
      return {
        // ключи - id статусов
        taskListByStatus: {}
      }
    },
    methods: {
      openModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      refreshTaskListByStatus() {

        this.taskListByStatus = {};

        for (let statusIndex in this.statusList) {
          if (this.statusList.hasOwnProperty(statusIndex)) {

            this.taskListByStatus[this.statusList[statusIndex].id] = []
          }
        }

        for (let taskIndex in this.desk.taskList) {
          if (this.desk.taskList.hasOwnProperty(taskIndex)
          && this.desk.taskList[taskIndex].hasOwnProperty('status')
          && this.desk.taskList[taskIndex].status.hasOwnProperty('id')) {

            let curTaskStatusId = this.desk.taskList[taskIndex].status.id;

            this.taskListByStatus[curTaskStatusId].push(this.desk.taskList[taskIndex]);
          }
        }
      }
    },
    mounted: function () {
      this.refreshTaskListByStatus();
    }
  }
</script>

<style>
  .column-list {
    display: flex;
  }
  .desk-name {
    font-weight: 600;
  }
  .desk-header a {
    color: #fff;
  }
  .desk-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>