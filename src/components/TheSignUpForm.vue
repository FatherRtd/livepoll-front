<template>
  <div>signup</div>
  <v-text-field v-model="email"></v-text-field>
  <v-text-field v-model="name"></v-text-field>
  <v-text-field v-model="password"></v-text-field>
  <v-btn @click="testSignup">test signup</v-btn>
</template>

<script setup lang="ts">
import { SignupRequest } from "@/requests/SignupRequest";
import router, { Routes } from "@/router";
import { getUser, signup } from "@/services/AuthService";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = useUserStore();

const name = ref("");
const email = ref("");
const password = ref("");

const testSignup = async () => {
  const signupRequers: SignupRequest = {
    username: name.value,
    email: email.value,
    password_hash: password.value
  };

  await signup(signupRequers);

  const user = await getUser();

  if (user) {
    userStore.setUser(user);
  }

  router.push({ name: Routes.Home });
};
</script>

<style scoped></style>
