<script setup>
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const { logIn } = useAuthStore();
const username = ref("");
const password = ref("");

async function handleLogin() {
  await logIn(username.value, password.value);
  username.value = "";
  password.value = "";
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
  >
    <div class="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl space-y-6">
      <h2 class="text-3xl font-bold text-center text-gray-800">Sign In</h2>

      <form @submit.prevent="handleLogin()" class="space-y-5">
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="text-right text-sm">
          <router-link
            :to="{ name: 'register' }"
            class="text-blue-600 hover:underline"
          >
            Don't have an account?
          </router-link>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-200"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>
