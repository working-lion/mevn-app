<template>
  <header class="page-header">
    <div class="filter">
      <div class="filter-title">Фильтр:</div>
      <ul class="filter-options">
        <li v-for="filterItem in filter"
            :key="filterItem.name"
        >
          {{ filterItem.name }}
        </li>
      </ul>
    </div>
    <ul class="status-list">
      <li class="status-item"
           v-for="status in statusList"
           :key="status.name">
        {{ status.name }}
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'header-block',
    props: {
      filter: {
        type: Array
      },
      statusList: {
        type: Array
      }
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
  }
  a, a:hover, a:active, a:focus {
    color: #666;
    text-decoration: none;
  }
  .filter {
    display: flex;
    align-items: center;
  }
  .filter-options {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .filter-title {
    font-weight: 600;
    margin-right: 20px;
  }
  .filter-options li {
    padding: 3px 10px;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
  }
  .filter-options li.active, .filter-options li:hover {
    color: #666;
    background: #fff;
  }
  .filter-options li:last-child {
    margin-right: 0;
  }
  .status-list {
    margin: 0;
    padding: 15px 0;
    list-style: none;
    display: flex;
  }
  .status-list li {
    padding-bottom: 10px;
    border-bottom: 2px solid #fff;
    margin: 0 5px;
    width: 300px;
  }
</style>