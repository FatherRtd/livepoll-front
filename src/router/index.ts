import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import LogInForm from "@/components/LogInForm.vue";

export enum Routes {
  Home = "home",
  Auth = "auth",
  LogIn = "login",
  SignUp = "signup",
  Profile = "profile"
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: Routes.Home,
    component: HomeView
  },
  {
    path: "/auth",
    name: Routes.Auth,
    component: AuthView,
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        name: Routes.LogIn,
        component: LogInForm
      },
      {
        path: "signup",
        name: Routes.SignUp,
        component: SignUpForm
      }
    ]
  },
  {
    path: "/profile",
    name: Routes.Profile,
    component: ProfileView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({ name: Routes.Home });
  } else {
    next();
  }
});

export default router;
