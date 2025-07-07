import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TodoView from "@/views/TodoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
      meta: { user: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { user: true },
    },
    {
      path: "/todos",
      name: "todos",
      component: TodoView,
      meta: { auth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser && to.meta.user) {
    return { name: "todos" };
  }

  if (!loggedInUser && to.meta.auth) {
    return { name: "login" };
  }
});

export default router;
