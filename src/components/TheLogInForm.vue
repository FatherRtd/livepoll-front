<template>
  <div>login</div>
  <div>
    <v-btn @click="testLogin">TestLogin</v-btn>
  </div>
</template>

<script setup lang="ts">
import { getUser, login } from "@/services/AuthService";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const testLogin = async () => {
  const response = await login({
    email: "test@test.test",
    password: "test"
  });

  const user = await getUser();

  if (user) {
    userStore.setUser(user);
  }
};
</script>

<style scoped></style>
