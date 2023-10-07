import { vSetupConfig, vFetch, vCache } from "./lib";

const url = "https://jsonplaceholder.typicode.com/todos/1";

(async () => {
  const todos = await vFetch(url, {
    vOptions: {
      cache: "session",
    },
  });

  console.log(todos);
  //_ continue on the response caching 
})()
