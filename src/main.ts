import { vSetupConfig, vFetch } from "./lib";

const config = vSetupConfig({
  config: {
    baseUrl: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "arrayBuffer"
  }
});

const fetchPosts = async () => {
  const response = await vFetch('https://jsonplaceholder.typicode.com/posts');
  
  console.log("response", response);
}

fetchPosts();

