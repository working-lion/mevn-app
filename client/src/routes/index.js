import Start from '@/components/pages/posts/StartPage'

// posts
import Posts from '@/components/pages/posts/PostsPage'
import NewPost from '@/components/pages/posts/NewPostPage'
import EditPost from '@/components/pages/posts/EditPostPage'

// tasks
import Tasks from '@/components/pages/tasks/TasksPage.vue'



const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  // posts
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/posts/:id',
    name: 'EditPost',
    component: EditPost
  },
  // tasks
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
]

export default routes