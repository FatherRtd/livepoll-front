<script setup lang="ts">
import { RouterView } from "vue-router";
import { getToken, getCurrentUser } from "@/services/AuthService";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/models/User";
import TheUiNavBar from "@/components/Ui/TheUiNavBar.vue";

const userStore = useUserStore();

onMounted(async () => {
  if (getToken()) {
    const user: User = await getCurrentUser();

    if (user) {
      userStore.setUser(user);
    }
  }
});
</script>

<template>
  <div>
    <TheUiNavBar></TheUiNavBar>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
