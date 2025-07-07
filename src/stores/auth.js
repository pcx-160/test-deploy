import { defineStore } from "pinia";
import router from "@/router";

export const useAuthStore = defineStore("authStore", {
  state: () => ({}),

  actions: {
    register(username, pass) {
      if (username && pass) {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        users.push({
          user: username,
          password: pass,
          todos: [],
        });

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", username);
        router.push({ name: "todos" });
      } else {
        alert("❌ Invalid username or password");
      }
    },

    logIn(username, pass) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.user === username && u.password === pass
      );

      if (user) {
        console.log("✅ Logged in");
        localStorage.setItem("loggedInUser", username);
        router.push({ name: "todos" });
      } else {
        alert("❌ Invalid username or password");
      }
    },

    logOut() {
      localStorage.removeItem("loggedInUser");
      router.push({ name: "login" });
    },
  },
});
