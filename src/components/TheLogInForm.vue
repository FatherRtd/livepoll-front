<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="email" label="Почта"></v-text-field>

      <v-text-field v-model="password" label="Пароль"></v-text-field>

      <v-btn type="submit" block class="mt-2" @click="onLogin">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { LoginRequest } from "@/requests/LoginRequest";
import router, { Routes } from "@/router";
import { getCurrentUser, login } from "@/services/AuthService";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const onLogin = async () => {
  const signupRequers: LoginRequest = {
    email: email.value,
    password: password.value
  };

  await login(signupRequers);

  const user = await getCurrentUser();

  if (user) {
    userStore.setUser(user);
  }

  router.push({ name: Routes.Home });
};
</script>

<style scoped></style>
