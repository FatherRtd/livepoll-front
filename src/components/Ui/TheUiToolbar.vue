<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        <router-link :to="Routes.Home"><span>Livepoll</span></router-link>
      </v-toolbar-title>
      <div v-if="!userStore.isAuthenticated">
        <v-btn :to="{ name: Routes.LogIn }">Login</v-btn>
        <v-btn :to="{ name: Routes.SignUp }">Signup</v-btn>
      </div>
      <div v-else>
        <v-btn :to="{ name: Routes.Profile }">Profile</v-btn>
        <v-btn @click="logout">Logout</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { Routes } from "@/router";
import { clearToken } from "@/services/AuthService";

const userStore = useUserStore();

const logout = () => {
  userStore.setUser(null);
  clearToken();
};
</script>

<style scoped></style>
