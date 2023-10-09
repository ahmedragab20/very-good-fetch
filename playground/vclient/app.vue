<template>
  <div class="container mx-auto py-10">
    <h2 class="text-4xl font-extrabold mb-5">
      ✨ <span class="text-primary-400">Retry</span> Work goes here
    </h2>
    <UButton
      @click="refresh"
      icon="i-heroicons-sparkles"
      size="xl"
      :ui="{
        rounded: 'rounded-full',
      }"
    >
      Retry Rquest
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { vFetch, vSetupConfig } from "../../library/src/lib/index";

vSetupConfig({
  interceptors: {
    onError(error) {
      console.log(error);
      return error;
    },
  },
});

const refresh = async () => {
  const controller = new AbortController();

  const response = await vFetch("http://localhost:3000/api/hello", {
    vOptions: {
      retry: {
        request: refresh,
      },
    },
    signal: controller.signal,
  });

  console.log(response);

  // controller.abort();
};
</script>
