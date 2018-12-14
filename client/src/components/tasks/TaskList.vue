<template>

  <div :class="columnItemClasses"
       @dragover="dragOver($event)"
       @dragenter="dragEnter"
       @dragleave="dragLeave"
       @drop="drop($event)"
  >
    <div class="column-body">
      <div class="tasks-list"

      >
        <task-item
          v-for="task in taskList"
          :key="task.id"
          v-if="task.show"
          :task="task"
          v-on:drop-on="turnOnDropAvailable"
          v-on:drop-off="turnOffDropAvailable"
        >
        </task-item>

        <div class="pointer"></div>
      </div>
    </div>
    <!--<div class="column-footer">
      <a href="#" class="add-task" @click="openAddTaskModal">Добавить карточку</a>
    </div>-->
  </div>
</template>

<script>
  // bus
  import {bus} from '@/main';

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
      },
      listIndex: null,
      userId: null,
    },
    data() {
      return {
        columnItemClasses: {
          'column-item': true,
          'drag-enter': false,
          'drop': false,
        },

        isDropAvailable: true,
      }
    },
    methods: {
      openAddTaskModal() {
        this.$emit('open-modal');
      },
      dragOver(e) {
        // нужно, чтобы срабатывал drop
        e.preventDefault();
        this.showPointer();
      },
      dragEnter() {},
      dragLeave() {
        this.hidePointer();
      },
      drop(e) {
        let draggedTaskId = e.dataTransfer.getData("movedTaskId");

        if (this.isDropAvailable) {
          bus.$emit('move-task', {movedTaskId: draggedTaskId, listIndex: this.listIndex, userId: this.userId});
        }

        this.hidePointer();
      },
      showPointer() {
        if (this.isDropAvailable) {
          this.columnItemClasses['drag-enter'] = true;
        }
      },
      hidePointer() {
        this.columnItemClasses['drag-enter'] = false;
      },
      turnOnDropAvailable() {
        console.log('ВКЛ');
        this.isDropAvailable = true;
      },
      turnOffDropAvailable() {
        console.log('ВЫКЛ');
        this.isDropAvailable = false;
      }
    },
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
    min-height: 60px;
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
  .pointer {
    height: 50px;
    background: #bbb url('../../assets/down-arrow.png') center no-repeat;
    background-size: auto;
    border-radius: 3px;
    display: none;
  }
  .drag-enter .pointer {
    display: block;
  }
</style>
