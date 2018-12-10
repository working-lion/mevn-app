<template>
  <header class="page-header">
    <filter-block></filter-block>
  </header>
</template>

<script>
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
</style>