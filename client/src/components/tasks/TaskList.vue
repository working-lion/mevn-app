<template>

  <div class="column-item">
    <div class="column-body">
      <div class="tasks-list">
        <task-item
          v-for="task in taskList"
          :key="task.id"
          v-if="task.show"
          :task="task"
        >
        </task-item>
      </div>
    </div>
    <div class="column-footer">
      <a href="#" class="add-task" @click="openAddTaskModal">Добавить карточку</a>
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
        type: Array
      }
    },
    methods: {
      openAddTaskModal() {
        this.$emit('open-modal');
      }
    }
  }
</script>

<style scoped>
  .column-item {
    color: #666;
    background: #dfe3e6;
    border-radius: 3px;
    padding: 5px;
    margin: 0 5px;
    flex-grow: 1;
    flex-basis: 100%;
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
