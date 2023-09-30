<template>
  <div>login</div>
  <div>
    <v-btn @click="testLogin">TestLogin</v-btn>
  </div>
</template>

<script setup lang="ts">
import router, { Routes } from "@/router";
import { getCurrentUser, login } from "@/services/AuthService";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const testLogin = async () => {
  await login({
    email: "test@test.test",
    password: "test"
  });

  const user = await getCurrentUser();

  if (user) {
    userStore.setUser(user);
  }

  router.push({ name: Routes.Home });
};
</script>

<style scoped></style>
