import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseDetail from '../views/course/CourseDetail.vue'
import ProfileView from '../views/profile/ProfileView.vue'
import UserAssistantChat from '../views/profile/UserAssistantChat.vue'
import CourseStady from '@/views/course/CourseStady.vue'
import Login from '@/views/login/LoginPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/course/:id',
      name: 'courseDetail',
      component: CourseDetail
    },
    {
      path: '/coursestady',
      name: 'coursestady',
      component: CourseStady
    },
    {
      path: '/profile',
      component: ProfileView,
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('../views/profile/UserProfile.vue')
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('../views/profile/UserCourses.vue')
        },
        {
          path: 'exercises',
          name: 'exercises',
          component: () => import('../views/profile/UserExercises.vue')
        },
        {
          path: 'exams',
          name: 'exams',
          component: () => import('../views/profile/UserExams.vue')
        },
        {
          path: 'assistant',
          name: 'assistant',
          component: () => import('../views/profile/UserAssistant.vue')
        },
        {
          path: 'chat',
          name: 'chat',
          component: UserAssistantChat
        },
      
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
