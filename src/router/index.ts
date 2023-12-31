import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SignUpForm from "@/components/TheSignUpForm.vue";
import LogInForm from "@/components/TheLogInForm.vue";
import { useUserStore } from "@/stores/userStore";
import { getToken } from "@/services/AuthService";

export enum Routes {
  Home = "home",
  Auth = "auth",
  LogIn = "login",
  SignUp = "signup",
  Profile = "profile"
}

export const routes: RouteRecordRaw[] = [
  {
    path: "",
    redirect: { name: Routes.Home }
  },
  {
    path: "/home",
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
  const token = getToken();

  if (to.matched.length === 0) {
    next({ name: Routes.Home });
  } else {
    if (token && (to.name == Routes.LogIn || to.name == Routes.SignUp)) {
      next({ name: Routes.Profile });
    }

    if (!token && to.name == Routes.Profile) {
      next({ name: Routes.Auth });
    }

    next();
  }
});

export default router;
