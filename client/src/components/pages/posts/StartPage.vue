<template>
  <div class="body">

    <header-block></header-block>

    <div class="content">
      <div class="desk-header">
        <div class="desk-header-left"><span class="desk-name">Название доски</span></div>
        <div class="desk-header-right"><a href="#" class="desk-menu">меню</a></div>
      </div>

      <task-list></task-list>

    </div>

    <footer-block></footer-block>

  </div>
</template>

<script>
  import headerBlock from '@/components/Header'
  import footerBlock from '@/components/Footer'
  import taskList from '@/components/tasks/TaskList'

  export default {
    name: 'start-page',
    components: {
      taskList,
      headerBlock,
      footerBlock,
    },
    data() {
      return {
        name: 'НАЗВАНИЕ РАБОЧЕГО СТОЛА',
        footer_logo: 'FOOTER_LOGO'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: rgb(0, 174, 204);
  }
  .body {
    position: relative;
    padding-bottom: 44px;
    height: 100%;
  }
  .content {
    padding: 0 10px;
  }
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
