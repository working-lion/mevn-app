<template>
  <header>
    <div class="header-left"></div>
    <div class="header-center">
      <div class="logo">{{ logo }}</div>
    </div>
    <div class="header-right"></div>
  </header>
</template>

<script>
  export default {
    name: 'header-block',
    data() {
      return {
        logo: 'HEADER-LOGO'
      }
    }
  }
</script>

<style scoped>
  header {
    padding: 10px;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
  }
</style>