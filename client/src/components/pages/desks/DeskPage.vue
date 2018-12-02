<template>
  <div class="body">

    <header-block></header-block>

    <div class="content">

      <desk-header :title="title"></desk-header>

      <task-list></task-list>

    </div>

    <footer-block></footer-block>

  </div>
</template>

<script>
  // Components
  import headerBlock from '@/components/Header'
  import footerBlock from '@/components/Footer'
  import deskHeader from '@/components/desks/DeskHeader'
  import taskList from '@/components/tasks/TaskList'

  // Services
  import TasksService from '@/services/DesksService'

  var deskId = '5bfebc83ea132727dcb26da2';

  export default {
    name: 'task-list-page',
    components: {
      deskHeader,
      taskList,
      headerBlock,
      footerBlock,
    },
    data () {
      return {
        _id: '',
        title: '',
        list: []
      }
    },
    methods: {
      async getDesk() {
        const response = await DesksService.getDesk(deskId);
        this.id = response.data._id;
        this.title = response.data.title;
        this.list = response.data.list;
      },
    },
    mounted () {
      this.getDesk();
    }
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
