<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="email" label="Почта" />
      <v-text-field v-model="name" label="Имя пользователя" />
      <v-text-field v-model="password" label="Пароль" />

      <v-btn type="submit" block class="mt-2" @click="onSignup">Зарегистрироваться</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { SignupRequest } from "@/requests/SignupRequest";
import router, { Routes } from "@/router";
import { getCurrentUser, signup } from "@/services/AuthService";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = useUserStore();

const name = ref("");
const email = ref("");
const password = ref("");

const onSignup = async () => {
  const signupRequers: SignupRequest = {
    username: name.value,
    email: email.value,
    password_hash: password.value
  };

  await signup(signupRequers);

  const user = await getCurrentUser();

  if (user) {
    userStore.setUser(user);
  }

  router.push({ name: Routes.Home });
};
</script>

<style scoped></style>
