import router, { Routes } from "@/router";
import { getToken, refresh, setTokenToLocalStorage } from "@/services/AuthService";
import { useUserStore } from "@/stores/userStore";
import AsyncLock from "async-lock";
import axios from "axios";
import { Plugin } from "vue";

const lock = new AsyncLock();

export const AxiosPlugin: Plugin = {
  install() {
    axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.withCredentials = true;

    const userStore = useUserStore();

    axios.interceptors.request.use(async (request) => {
      const accessToken = getToken();

      if (accessToken) {
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return request;
    });

    const createAxiosResponseInterceptor = () => {
      const interceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const status = error.response ? error.response.status : null;

          if (status === 403) {
            await lock.acquire("no-access-redirect", async () => {
              userStore.setUser(null);

              await router.push({ name: Routes.Home });
            });
          }

          if (status === 401) {
            axios.interceptors.response.eject(interceptor);

            try {
              let accessToken = "";

              await lock.acquire("refresh-token", async () => {
                accessToken = (await refresh()).access_token ?? "";
              });

              setTokenToLocalStorage(accessToken);
              error.response.config.headers["Authorization"] = `Bearer ${accessToken}`;

              return axios(error.response.config);
            } finally {
              createAxiosResponseInterceptor();
            }
          }

          console.log(error);

          return Promise.reject(error);
        }
      );
    };

    createAxiosResponseInterceptor();
  }
};
