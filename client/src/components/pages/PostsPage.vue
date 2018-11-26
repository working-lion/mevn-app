<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h1>Posts</h1>
        <h3>This file will list all the posts</h3>
        <section class="panel panel-success" v-if="posts.length">
          <div class="panel-heading">list of posts</div>
          <table class="table table-striped">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            <tr v-for="(post, index) in posts" :key="post.title">
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>
                <router-link :to="{ name: 'EditPost', params: { id: post._id } }">edit post</router-link>
                <button class="btn btn-danger btn-sm" type="button" @click="removePost(post._id)">delete</button>
              </td>
            </tr>
          </table>
        </section>
        <section class="panel panel-danger" v-if="!posts.length">
          <p>There are no posts ... Lets add one now!</p>
          <div>
            <a class="router-link" :to="{ name: 'NewPost' }">add new post</a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import PostsService from '@/services/PostsService'

  export default {
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
  }
</script>
