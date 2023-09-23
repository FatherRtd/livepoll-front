import { User } from "@/models/User";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null as User | null
  }),
  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => state.user != null
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;
    }
  }
});
