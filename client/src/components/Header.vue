<template>
  <header class="page-header">
    <filter-block></filter-block>
    <ul class="header-menu">
      <li class="header-menu-add" @click="addTask">
        <span class="plus"></span>Добавить задачу
      </li>
    </ul>
  </header>
</template>

<script>
  // bus
  import {bus} from '@/main';

  // components
  import filterBlock from '@/components/filter/FilterBlock';

  export default {
    name: 'header-block',
    components: {
      filterBlock
    },
    props: {
      statusList: {
        type: Array
      }
    },
    methods: {
      addTask() {
        bus.$emit('open-add-task-form');
      },
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    color: #666;
  }
  .body {
    padding-bottom: 58px;
    position: relative;
    min-height: 100vh;
  }
  .page-header {
    padding: 10px;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
  }
  a, a:hover, a:active, a:focus {
    color: #666;
    text-decoration: none;
  }
  .header-menu {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .header-menu li {
    position: relative;
    cursor: pointer;
  }
  .header-menu .header-menu-add {
    padding-left: 22px;
  }
  .plus {
    display: block;
    width: 16px;
    height: 4px;
    position: absolute;
    background: rgba(255,255,255,0.8);
    top: 7px;
    left: 0;
  }
  .plus::before, .plus::after {
    content: '';
    display: block;
    width: 4px;
    height: 6px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 6px;
  }
  .plus::before {
    bottom: 100%;
  }
  .plus::after {
    top: 100%;
  }
  .header-menu-add:hover {
    text-decoration: underline;
  }
  .header-menu-add:hover .plus,
  .header-menu-add:hover .plus::before,
  .header-menu-add:hover .plus::after{
    background: rgba(255,255,255,1);
  }
</style>