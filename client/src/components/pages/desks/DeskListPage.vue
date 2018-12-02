<template>
  <div class="body">

    <header-block></header-block>

    <div class="content">

      <desks-list></desks-list>

    </div>

    <footer-block></footer-block>

  </div>
</template>

<script>
  // Components
  import headerBlock from '@/components/Header'
  import footerBlock from '@/components/Footer'
  import desksList from '@/components/desks/DesksList'

  // Services
  //import DesksService from '@/services/DesksService'

  export default {
    name: 'desks-list-page',
    components: {
      headerBlock,
      footerBlock,
      desksList
    }
  }
</script>