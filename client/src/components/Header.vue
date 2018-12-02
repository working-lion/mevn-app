<template>
  <header class="page-header">
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

<style>
  html, html * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    color: #666;
  }
  .body {
    padding-bottom: 38px;
    position: relative;
    height: 100vh;
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
</style>