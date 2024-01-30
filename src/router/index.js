import { createRouter, createWebHistory } from 'vue-router'
import Courses from "../views/Courses.vue";
import ACourse from "../views/ACourse.vue";

const routes = [{
  path: '/Courses',
  name: 'Courses',
  component: Courses,
},
{
  path: '/ACourse/:id',
  name: 'ACourse',
  component: ACourse,
},
, 
{
  path: "/:catchAll(.*)",
  name: "Courses",
  component: Courses,
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
