import { vSetupConfig, vFetch } from "./lib";
import { useGlobal } from "./lib/utils/internals";
const conf = useGlobal().get("_config");

const config = vSetupConfig({
  config: {
    baseUrl: "https://dummyjson.com/products/",
    responseType: "json",
    headers: {
      "Hello-World": "Hello World",
    },
  },
  interceptors: {
    onBeforeRequest(request) {
      console.log("onBeforeRequest ✨", request);
      request.headers.set("Hello-World-90", "Hello World");

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
    onError(error) {
      console.log("onError", error);

      return error;
    },
  },
});

console.log("config", config);

const fetchPosts = async () => {
  const response = await vFetch("add", {
    method: "POST",
    body: 2,
  });

  console.log("response", response);
};

fetchPosts();
