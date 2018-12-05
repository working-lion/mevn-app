// posts
import Posts from '@/components/pages/posts/PostsPage'
import NewPost from '@/components/pages/posts/NewPostPage'
import EditPost from '@/components/pages/posts/EditPostPage'

// tasks
import Tasks from '@/components/pages/tasks/TasksPage.vue'

// desks
import DeskList from '@/components/pages/desks/DeskListPage.vue'
import Desk from '@/components/pages/desks/DeskPage.vue'

// start
import StartPage from '@/components/pages/StartPage';


const routes = [
  {
    path: '/',
    name: 'StartPage',
    component: StartPage
  },
  //desks
  {
    path: '/desks/:id',
    name: 'Desk',
    component: Desk
  },
  {
    path: '/desks',
    name: 'DeskList',
    component: DeskList
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
  /*{
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  }*/
]

export default routes