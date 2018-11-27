<template>
  <div class="task-item">
    <div class="task-item-header">
      <div class="task-item-name">{{ name }}</div>
    </div>
    <div class="task-item-footer">
      <div class="created">{{ created }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-item',
  props: {
    propName: String
  },
  data () {
    return {
      name: 'Название задачи',
      created: '27.10.18'
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
