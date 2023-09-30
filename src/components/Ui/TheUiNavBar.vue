<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        <router-link :to="{ name: Routes.Home }"><span>Livepoll</span></router-link>
      </v-toolbar-title>
      <div v-if="!userStore.isAuthenticated">
        <v-btn :to="{ name: Routes.LogIn }">Войти</v-btn>
        <v-btn :to="{ name: Routes.SignUp }">Зарегестрироваться</v-btn>
      </div>
      <div v-else>
        <v-btn :to="{ name: Routes.Profile }">Профиль</v-btn>
        <v-btn @click="onLogout">Выйти</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import router, { Routes } from "@/router";
import { logout } from "@/services/AuthService";

const userStore = useUserStore();

const onLogout = () => {
  userStore.setUser(null);
  logout();
  router.push({ name: Routes.Home });
};
</script>

<style scoped></style>
