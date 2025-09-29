import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home-view.vue'),
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/todos-view.vue'),
    },
    {
      path: '/todos/:id',
      name: 'todo',
      component: () => import('../views/todo-id-view.vue'),
      props: true,
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/signin-view.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup-view.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/not-found-view.vue'),
    },
  ],
})

export default router
