<template>
  <div class="desk-body">
    <div class="column-list-scroll">
      <div class="column-list">
        <div class="column-item">
          <div class="column-header">
            <span class="column-name">{{ name }}</span>
            <a href="#" class="column-menu">меню</a>
          </div>
          <div class="column-body">
            <div class="tasks-list">
              <task-item
                v-for="task in tasks"
                v-bind:key="task.id"
                v-bind:task="task"
                :prop-name="'Hello' + 1"
              >
              </task-item>
            </div>
          </div>
          <div class="column-footer">
            <a href="#" class="add-task">Добавить карточку</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import taskItem from '@/components/tasks/Task'

  export default {
    name: 'task-list',
    components: {
      taskItem
    },
    data() {
      return {
        name: 'Название списка задач',
        tasks: [
          // тут нужно запрашивать данные из БД.
          {
            id: 1,
            name: 'Задача 1'
          },
          {
            id: 2,
            name: 'Задача 2'
          },
          {
            id: 3,
            name: 'Задача 3'
          },
          {
            id: 4,
            name: 'Задача 4'
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .column-list {
    display: inline-flex;
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
  }
  .add-task::before {
    font-size: 30px;
    content: '+';
    display: block;
    width: 20px;
    height: 24px;
    line-height: 24px;
    text-align: left;
    vertical-align: middle;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
