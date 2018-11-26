<template>
  <div class="task-item">
    <div class="task-item-header">
      header
    </div>
    <div class="task-item-body">
      <div class="task-item-name">{{ name }}</div>
    </div>
    <div class="task-item-footer">
      {{ propName }}
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
      name: 'Название задачи'
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
  .task-item-header, .task-item-footer {
    color: #999;
    font-size: 0.8em;
  }
</style>
