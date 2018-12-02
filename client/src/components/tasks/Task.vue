<template>
  <div class="task-item" :data-id="task._id">
    <div class="task-item-header">
      <div class="task-item-name">{{ title }}</div>
    </div>
    <div class="task-item-footer">
      <div class="created">вспом. инфа</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-item',
  props: {
    task: {
      type: Object,
      required: true,
      default: {
        title: 'Task name'
      }
    }
  },
  data () {
    return {
      title: this.task.title
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
  }
  .task-item-footer {
    color: #999;
    font-size: 0.8em;
  }
</style>
