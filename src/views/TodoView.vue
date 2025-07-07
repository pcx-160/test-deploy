<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { logOut } = useAuthStore();
const loggedInUser = localStorage.getItem("loggedInUser");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find((u) => u.user === loggedInUser);

const currentUserTodos = ref([...currentUser.todos]);
const todo = ref("");
const isEditing = ref(false);
const editingIndex = ref(null);

function addTodo() {
  if (todo.value.trim() === "") return;

  currentUserTodos.value.push(todo.value);
  currentUser.todos.push(todo.value);
  localStorage.setItem("users", JSON.stringify(users));

  todo.value = "";
}

function editTodo(index) {
  todo.value = currentUserTodos.value[index];
  isEditing.value = true;
  editingIndex.value = index;
  console.log(index);
}

function saveEdit() {
  if (todo.value.trim() === "") return;

  currentUserTodos.value[editingIndex.value] = todo.value;
  currentUser.todos[editingIndex.value] = todo.value;
  localStorage.setItem("users", JSON.stringify(users));

  todo.value = "";
  isEditing.value = false;
  editingIndex.value = null;
}

function deleteTodo(index) {
  currentUserTodos.value.splice(index, 1);
  currentUser.todos.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-12"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-6">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold text-center text-gray-800">
          Welcome, {{ loggedInUser }}
        </h1>

        <button
          @click="logOut"
          class="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V4m0 0a9 9 0 110 16 9 9 0 010-16z"
            />
          </svg>
          Log Out
        </button>
      </div>

      <div class="flex gap-2">
        <input
          v-model="todo"
          type="text"
          placeholder="Add todo"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          @click="isEditing ? saveEdit() : addTodo()"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
        >
          {{ isEditing ? "Save" : "Add" }}
        </button>
      </div>

      <!-- List of todos -->
      <div class="space-y-2">
        <div
          v-for="(item, index) in currentUserTodos"
          :key="index"
          class="bg-gray-50 px-4 py-2 rounded-lg shadow-sm text-gray-700 flex justify-between items-center"
        >
          <span>{{ item }}</span>
          <div class="space-x-2">
            <button
              @click="editTodo(index)"
              class="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              @click="deleteTodo(index)"
              class="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
