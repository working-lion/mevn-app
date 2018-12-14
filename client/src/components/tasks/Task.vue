<template>
  <div :class="classes"
       :data-id="task.id"
       v-if="task.hasOwnProperty('id') && task.id"
       draggable="true"

       @dragstart="dragStart"
       @dragend="dragEnd"
  >
    <!-- @drag="drag" -->
    <div class="task-item-header">
      <div class="task-item-number" @click="taskClickHandler">{{ task.number }}</div>
      <div class="task-item-name">{{ task.title }}</div>
      <!--<span class="task-item-menu-btn">
        <span class="task-item-menu-circle"></span>
        <ul class="task-item-menu">
          <li>редактировать</li>
          <li>удалить</li>
        </ul>
      </span>-->

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
      taskClickHandler() {
        bus.$emit('open-task-right', this.task);
      },

      // drag-drop
/*      drag() {
        this.classes['drag-on'] = true;
      },
      drop() {
        this.classes['drag-on'] = false;
      },*/
      dragStart() {
        this.$store.dispatch('SET_DRAGGED_TASK_ID', this.task.id);
        // bus.$emit('set-drag-task', this.task.id);

        // приколюхи с перетаскиванием
        this.classes['drag-on'] = true;
      },
      dragEnd() {
        this.classes['drag-on'] = false;
      }
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
  .task-item-menu-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2px 10px;
    display: none;
  }
  .task-item:hover .task-item-menu-btn {
    display: block;
  }
  .task-item-menu {
    position: absolute;
    top: 100%;
    right: 0;
    border-radius: 3px;
    padding: 5px 10px;
    margin: 0;
    display: none;
    list-style: none;
    width: 120px;
    background: #f1f1f1;
    border: 1px solid rgb(0, 174, 204);
  }
  .task-item-menu li {
    font-size: 13px;
    padding-left: 0;
    margin-bottom: 5px;
    transition: padding 0.3s;
    cursor: pointer;
  }
  .task-item-menu li:hover {
    color: rgb(0, 174, 204);
    padding-left: 3px;
  }
  .task-item-menu-btn:hover .task-item-menu {
    display: block;
  }
  .task-item-menu-circle, .task-item-menu-circle::before, .task-item-menu-circle::after {
    display: block;
    width: 5px;
    height: 5px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    position: relative;
  }
  .task-item-menu-btn:hover .task-item-menu-circle,
  .task-item-menu-btn:hover .task-item-menu-circle::before,
  .task-item-menu-btn:hover .task-item-menu-circle::after {
    background: rgba(0, 0, 0, 1);
  }
  .task-item-menu-circle::before, .task-item-menu-circle::after {
    content: '';
    position: absolute;
    top: 0;
  }
  .task-item-menu-circle::before {
    left: -8px;
  }
  .task-item-menu-circle::after {
    right: -8px;
  }

  /*drag-drop*/
  .task-item.drag-on {
    background: #dbdbdb;
    cursor: grabbing;
  }
</style>
