<template>
  <div class="column-list">
    <div class="column-item">
      <div class="column-header">
        <span class="column-name">{{ taskList.title }}</span>
        <a href="#" class="column-menu">меню</a>
      </div>
      <div class="column-body">
        <div class="tasks-list">
          <task-item
            v-for="task in taskList.list"
            :key="task._id"
            :task="task"
          >
          </task-item>
        </div>
      </div>
      <div class="column-footer">
        <a href="#" class="add-task" @click="openAddTaskModal">Добавить карточку</a>
      </div>
    </div>
  </div>
</template>

<script>
  // components
  import taskItem from '@/components/tasks/Task'

  // Services
  import TasksService from '@/services/TasksService'

  export default {
    name: 'task-list',
    components: {
      taskItem
    },
    props: {
      taskList: {
        type: Object,
        default: {}
      }
    },
    methods: {
      openAddTaskModal(){
        this.$emit('open-modal');
      }
      /*async getTasks() {
        const response = await TasksService.getTasks()
        this.tasks = response.data.tasks
      },*/
    },
    mounted() {
      /*this.getTasks()*/
    }
  }
</script>

<style scoped>
  .column-list {
    display: flex;
    align-items: start;
    justify-content: flex-start;
  }
  .column-item {
    color: #666;
    background: #dfe3e6;
    border-radius: 3px;
    padding: 5px;
    margin: 0 5px;
    width: 300px;
  }
  .column-header {
    display: flex;
    justify-content: space-between;
  }
  .add-task {
    display: block;
    padding-left: 22px;
    position: relative;
    margin-top: 10px;
  }
  .add-task::before {
    font-size: 30px;
    content: '+';
    display: block;
    width: 20px;
    height: 18px;
    line-height: 18px;
    text-align: left;
    vertical-align: middle;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
