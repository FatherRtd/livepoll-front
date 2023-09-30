<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field
          v-model="login"
          label="Логин"
      ></v-text-field>

      <v-text-field
          v-model="password"
          label="Пароль"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">

import {ref} from "vue";

const login = ref('');
const password = ref('');
</script>

<style scoped>

</style>