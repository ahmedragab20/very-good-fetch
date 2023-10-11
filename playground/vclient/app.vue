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
        Click me {{ counter }} - {{ actualCounter }}
      </UButton>
    </div>

    <div>
      <UInput
        v-model="search"
        placeholder="Search for something nice..."
        class="mb-5"
      />
    </div>
    <div>
      <pre>{{ respose }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vFetch, vDebounce, vThrottle } from "../../library/src/lib/index";

const debounced = new vDebounce({ delay: 300 });
const throttled = new vThrottle({ delay: 2000 });

const search = ref("");
const respose = ref();
function getSearch(term: string) {
  throttled.run(async () => {
    respose.value = await vFetch(
      `https://demo.dataverse.org/api/search?q=${term}`
    );
  });
}
const counter = ref(0);
const actualCounter = ref(0);
const clickit = function () {
  actualCounter.value++;
  console.log("actualCounter: ", actualCounter.value);

  debounced.run(() => {
    counter.value++;
    console.log("counter: ", counter.value);
  });
};

watch(search, (value) => {
  console.log("search: ", value);

  getSearch(value);
});
</script>
