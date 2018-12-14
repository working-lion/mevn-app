<template>
  <div :class="classes"
       :data-id="task.id"
       v-if="task.hasOwnProperty('id') && task.id"
       draggable="true"

       @dragstart="dragStart($event)"
       @dragend="dragEnd($event)"
  >
    <div class="task-item-header">
      <div class="task-item-number" @click="taskClickHandler">{{ task.number }}</div>
      <div class="task-item-name">{{ task.title }}</div>
    </div>
    <div class="task-item-footer">
      <div class="task-prop">Статус:
        <span class="task-prop-val">{{ task.status.name }}</span>
      </div>
      <div class="task-prop">Приоритет:
        <span class="task-prop-val">{{ task.priority.name }}</span>
      </div>
      <div class="task-prop">Версия:
        <span class="task-prop-val">{{ task.version.name }}</span>
      </div>
      <div class="task-prop">Тип:
        <span class="task-prop-val">{{ task.type.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  // bus
  import {bus} from '@/main';

  export default {
    name: 'task-item',
    props: {
      task: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        classes: {
          'task-item': true,
          'drag-on': false
        }
      }
    },
    methods: {
      /**
       * Кидает событие о клике по номеру задачи в bus
       */
      taskClickHandler() {
        bus.$emit('open-task-right', this.task);
      },
      /**
       * Обрабатывает событие начала перетаскивания задачи
       * @param {Object} e - event
       */
      dragStart(e) {
        e.dataTransfer.setData('movedTaskId', this.task.id);

        this.$emit('drop-off');

        this.classes['drag-on'] = true;
      },
      /**
       * Обрабатывает событие окончания перетаскивания задичи
       */
      dragEnd() {
        this.classes['drag-on'] = false;

        this.$emit('drop-on');
      },
    }
  }
</script>

<style scoped>
  .task-item {
    background: #fff;
    border-radius: 3px;
    margin: 5px 0;
    padding: 5px;
    cursor: grab;
  }
  .task-item-header {
    position: relative;
  }
  .task-item-number {
    color: #323232;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .task-item-number:hover {
    color: #666;
    text-decoration: underline;
  }
  .task-item-name {
    font-size: 14px;
  }
  .task-item-footer {
    color: #999;
    font-size: 0.8em;
    padding-top: 5px;
  }
  .task-item.drag-on {
    background: #dbdbdb;
    cursor: grabbing;
  }
</style>
