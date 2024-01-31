import { createRouter, createWebHistory } from 'vue-router';
import Courses from "../views/Courses.vue";
import ACourse from "../views/ACourse.vue";
import SignUp from "../views/SignupPage.vue";
import LogIn from "../views/LoginPage.vue";
import ContactsPage from "../views/ContactsPage.vue";
import auth from "../auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Courses,
    beforeEnter: async (to, from, next) => {
      console.log('beforeEnter guard triggered for Home');
      let authResult = await auth.authenticated();
      if (!authResult) {
        console.log('User not authenticated, redirecting to login');
        next('/login');
      } else {
        console.log('User authenticated, proceeding to the home page');
        next();
      }
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: ContactsPage,
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        console.log('User not authenticated, redirecting to login');
        next('/login');
      } else {
        console.log('User authenticated, proceeding to Courses Page');
        next();
      }
    },
  },
  {
    path: '/acourse/:id',
    name: 'ACourse',
    component: ACourse,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        console.log('User not authenticated, redirecting to login');
        next('/login');
      } else {
        console.log('User authenticated, proceeding to Single Course Page');
        next();
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
