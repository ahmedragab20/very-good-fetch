<template>
  <div class="container mx-auto py-10 px-10">
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

    <div class="max-w-sm">
      <label for="search_input">Search Products</label>
      <UInput id="search_input" v-model="search" trailing />
    </div>

    <div>
      <UButton
        @click="retryit"
        class="my-5 duration-200 active:scale-95"
        color="pink"
        size="xl"
        variant="outline"
        :ui="{
          rounded: 'rounded-full',
        }"
      >
        Retry it...
      </UButton>
    </div>
    <div>
      <UButton
        @click="vtimeout"
        class="my-5 duration-200 active:scale-95"
        color="orange"
        size="xl"
        variant="outline"
        :ui="{
          rounded: 'rounded-full',
        }"
      >
        Run Timeout
      </UButton>
    </div>

    <div>
      <UButton
        @click="checkError"
        class="my-5 duration-200 active:scale-95"
        color="red"
        size="xl"
        variant="outline"
        :ui="{
          rounded: 'rounded-full',
        }"
      >
        Check Error
      </UButton>
    </div>

    <div class="my-5">
      <UBadge size="lg" variant="soft">
        <strong>{{ retryCount }}</strong>
      </UBadge>
    </div>

    <div class="my-5">
      <pre>{{ response }}</pre>
    </div>
    <div class="my-5">
      <pre>{{ timeoutResponse }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  vFetch,
  vDebounce,
  vThrottle,
  vSetupConfig,
  vRetry,
  vTimeout,
  vCache,
} from "very-good-fetch";

vSetupConfig({
  config: {
    baseUrl: "https://dummyjson.com",
    // muteErrors: false
  },
  interceptors: {
    onBeforeRequest(request) {
      console.log(request);
      request.headers.set("Content-Type", "application/json");
      return request;
    },
    onAfterRequest(request) {
      console.log(request);
      return request;
    },
    onBeforeResponse(response) {
      console.log(response);
      return response;
    },
    onError(error) {
      console.error("%c🚀Error", "color: red;", error);
      return error;
    },
  },
});

const response = ref();

const decounce = new vDebounce({ delay: 1000 });
const clickit = () => {
  decounce.run(async () => {
    response.value = await vFetch("/products/1", {
      method: "PATCH" /* or PATCH */,
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "iPhone Galaxy +1",
      }),
    });
  });
};

const throttle = new vThrottle({ delay: 2000 });

const search = ref("");

const searchit = (query: string) => {
  throttle.run(async () => {
    response.value = await vFetch(`/posts/search?q=${query}`);
  });
};

watch(search, searchit);
const retryCount = ref(0);

const retryit = async () => {
  const retry = new vRetry({
    maxRetries: 3,
    delay: 4000,
    onComplete: () => {
      console.log(
        "%cRetry completed",
        "color: #C55F96; font-weight: bold; font-size: 1.1rem;"
      );
    },
    retryCondition: (error) => {
      retryCount.value++;
      console.log(
        "%cRetry condition",
        "color: #FF5F57; font-weight: bold; font-size: 1.1rem;",
        error
      );
      return error && error.status === 200;
    },
  });
  retryCount.value = 0;
  console.log("Retry it...");
  response.value = await retry.run(async () => {
    try {
      return await vFetch("/products/1", {
        vOptions: {
          responseType: "pure",
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

interface Product {
  id: number;
  title: string;
  price: number;
}

const timeoutResponse = ref<Product>();

const vtimeout = async () => {
  const abort = new AbortController();

  const timeout = new vTimeout({
    timeout: 100,
    onFailed() {
      console.log("🥶 Timeout's over");
      abort.abort();
    },
  });

  timeoutResponse.value = await timeout.run<Product>(async () => {
    return await vFetch("/products", {
      signal: abort.signal,
    });
  });
};
const cache = new vCache("memory");
cache.set("key", {
  name: "Ahmed Ragab",
});
cache.set("key2", {
  name: "GAZA",
});
console.log(cache.get("key"));
console.log(cache.has("key"));
console.log(cache.size());
console.log(cache.keys());
console.log(cache.values());

console.log(cache.asObject());

const checkError = async () => {
  try {
    const res = await vFetch("/quotes?limit=32&skip=10", {
      method: "GET",
    });

    console.log({ res });
  } catch (error) {
    console.error(
      "%c🤦🏻‍♂️ Got an error boss!",
      "font-weight: bold; font-size: 1rem; color: seagreen; padding: 10px 4px;",
      error
    );
  }
};
</script>
