<!--<template lang="pug">
  .container
    .row
    .col-xs-12
      h1
        | Add New Post
      form
        .form-group
        input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="post.title" )
        .form-group
        textarea.form-control( type="text", rows="5", name="description", id="description", placeholder="Description", v-model.trim="post.description" )
        .form-group
        button.btn.btn-block.btn-primary( type="button", name="addPost", id="addPost", @click="addPost()" )
          | add new post
      section
        button.btn.btn-success.btn-block( type="button", @click="goBack()" )
          | go to posts page
</template>-->
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h1>Add New Post</h1>
        <form action="" class="new-post-form">
          <div class="form-group">
            <input type="text" name="title" id="title" placeholder="Title" v-model.trim="post.title">
          </div>
          <div class="form-group">
            <textarea type="text" rows="5" name="description" id="description" placeholder="Description"
                      v-model.trim="post.description"></textarea>
          </div>
          <div class="form-group">
            <button class="btn btn-block btn-primary" type="button" name="addPost" id="addPost" @click="addPost()">
              add new post
            </button>
          </div>
        </form>
        <section>
          <button class="btn btn-success btn-block" type="button" @click="goBack()">go to posts page</button>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .new-post-form {
    display: block;
    width: 600px;
    margin: 0 auto;
  }
  .new-post-form input, .new-post-form textarea{
    width: 100%;
  }
</style>

<script>
  import PostsService from '@/services/PostsService'

  export default {
    name: 'NewPostPage',
    data() {
      return {
        post: {
          title: '',
          description: ''
        }
      }
    },
    methods: {
      async addPost() {
        if (this.post.title !== '' && this.post.description !== '') {
          await PostsService.addNewPost({
            title: this.post.title,
            description: this.post.description
          })
          this.$router.push({name: 'Posts'})
        } else {
          alert('Empty fields!')
        }
      },
      goBack() {
        this.$router.push({name: 'Posts'})
      }
    }
  }
</script>
