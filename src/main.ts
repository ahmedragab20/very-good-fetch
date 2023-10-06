import { vSetupConfig, vFetch } from "./lib";

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
      console.log(response.type);
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
