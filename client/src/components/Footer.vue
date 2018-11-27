<template>
  <footer>
    <div class="footer-left"></div>
    <div class="footer-center">
      <div class="footer-logo">{{ footerLogo }}</div>
    </div>
    <div class="footer-right"></div>
  </footer>
</template>

<script>
  export default {
    name: 'footer-block',
    data() {
      return {
        footerLogo: 'FOOTER-LOGO'
      }
    }
  }
</script>

<style scoped>
  footer {
    padding: 10px;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>