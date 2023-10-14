<template>
  <div class="container mx-auto py-10">
    <h2 class="text-7xl font-extrabold">🐢</h2>
    <h2 class="text-4xl font-extrabold mb-5">
      <span class="text-primary-500">Very Good Work</span> Work goes here...
    </h2>

    <div>
      <UButton
        @click="clickit"
        class="mb-5 duration-200 active:scale-95"
        color="primary"
        size="xl"
        :ui="{
          rounded: 'rounded-full',
        }"
      >
        Click me
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  vFetch,
  vDebounce,
  vThrottle,
  vSetupConfig,
} from "../../library/dist/very-good-fetch.js";

vSetupConfig({
  config: {
    baseUrl: "https://dummyjson.com",
  },
  interceptors: {
    onBeforeRequest(request) {
      request.headers.set("Content-Type", "application/json");
      request.headers.set("FOO", "BAR");

      return request;
    },
    onAfterRequest(request) {
      console.log("onAfterRequest", request);

      return request;
    },
    onBeforeResponse(response) {
      console.log("onBeforeResponse", response);

      return response;
    },
  },
});

const clickit = () => {
  vFetch("/products/1", {
    method: "PUT" /* or PATCH */,
    // headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "iPhone Galaxy +1",
    }),
  }).then((res) => console.log(res));
};
</script>
