<template>
  <div class="desk-header">
    <div class="desk-header-left"><span class="desk-name">{{ name }}</span></div>
    <div class="desk-header-right"><a href="#" class="desk-menu">меню</a></div>
  </div>
</template>

<script>
  export default {
    name: 'desk-header',
    data() {
      return {
        name: 'Название стола'
      }
    }
  }
</script>

<style scoped>
  .desk-name {
    font-weight: 600;
  }
  .desk-header a {
    color: #fff;
  }
  .desk-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>