import { createRouter, createWebHistory } from 'vue-router'
import CoachDetails from '@/pages/coaches/CoachDetails.vue';
import CoachesList from '@/pages/coaches/CoachesList.vue';
import CoachRegister from '@/pages/coaches/CoachRegister.vue';
import ContactCoach from '@/pages/requests/ContactCoach.vue';
import RequestsReceived from '@/pages/requests/RequestsReceived.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'start', redirect: '/coaches' },
    { path: '/coaches', name: 'coaches', component: CoachesList },
    {
      path: '/coaches/:id', name: 'coachDetails', component: CoachDetails,
      children: [
        { path: 'contact', name: 'contact', component: ContactCoach },
      ]
    },
    { path: '/register', name: 'register', component: CoachRegister },
    { path: '/requests', name: 'requests', component: RequestsReceived },
    { path: '/:notFound(.*)', name: 'notFound', component: NotFound },
  ]
})

export default router