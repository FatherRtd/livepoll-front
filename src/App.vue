<script setup lang="ts">
import { RouterView } from "vue-router";
import { getUser } from "@/services/AuthService";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/models/User";
import TheUiToolbar from "@/components/Ui/TheUiToolbar.vue";

const userStore = useUserStore();

onMounted(async () => {
  const user: User = await getUser();

  if (user) {
    userStore.setUser(user);
  }
});
</script>

<template>
  <div>
    <TheUiToolbar></TheUiToolbar>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
