<template>
  <div class="container mx-auto py-10">
    <h2 class="text-4xl font-extrabold mb-5">
      ✨ <span class="text-primary-400">Retry</span> Work goes here
    </h2>
    <!-- <UButton
      @click="refresh"
      icon="i-heroicons-sparkles"
      size="xl"
      :ui="{
        rounded: 'rounded-full',
      }"
    >
      Retry Rquest
    </UButton> -->
    <button
      type="button"
      @click="refresh"
      class="px-4 py-2 border border-primary-400 rounded-full text-primary-400"
    >
      <span class="text-primary-400">Retry</span> Rquest
    </button>
  </div>
</template>

<script setup lang="ts">
import { vFetch, vSetupConfig, vRetry } from "../../library/src/lib/index";

vSetupConfig({
  interceptors: {
    onBeforeRequest(request) {
      console.log(`🐢 we have a request`);
      console.log(request);
      return request;
    },
    onError(error) {
      console.log(`🐢 we have an error`);

      console.log(error);
      return error;
    },
  },
});

const errJson = ref({
  code: 500,
  message: "Internal Server Error",
});

const refresh = async () => {
  const retry = new vRetry({
    maxRetries: 3,
    delay: 2000,
    onComplete(response) {
      console.log("onComplete", response);
    },
    retryCondition(error) {
      console.log("retryCondition", error);
      return true;
    },
  });

  const response = await retry.run(async () => {
    return await useFetch("/api/hello")
  });

  console.log(response);
};
</script>
