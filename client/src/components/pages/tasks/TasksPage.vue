<template>
  <div class="body">

    <header-block></header-block>

    <div class="content">

      <desk-header></desk-header>

      <task-list></task-list>

    </div>

    <footer-block></footer-block>

  </div>
</template>

<script>
  // Components
  import headerBlock from '@/components/Header'
  import footerBlock from '@/components/Footer'
  //import deskHeader from '@/components/desks/DeskHeader'
  import taskList from '@/components/tasks/TaskList'

  export default {
    name: 'task-list-page',
    components: {
      /*deskHeader,*/
      taskList,
      headerBlock,
      footerBlock,
    },
    data () {
      return {}
    },
    /*methods: {
      async getTasks() {
        const response = await TasksService.getTasks()
        this.tasks = response.data.tasks
      }
    },
    mounted () {
      this.getTasks()
    }*/
  }

  //import PostsService from '@/services/PostsService'

  /*export default {
    name: 'PostsPage',
    data () {
      return {
        posts: []
      }
    },
    methods: {
      async getPosts () {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      },
      async removePost (value) {
        await PostsService.deletePost(value)
        this.getPosts()
      }
    },
    mounted () {
      this.getPosts()
    }
  }*/
</script>
