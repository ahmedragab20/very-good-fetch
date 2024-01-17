import express from "express";
import fetchx from "node-fetch";
import { vFetch, vSetupConfig } from "very-good-fetch";

const app = express();

app.use(express.json());

const config = vSetupConfig({
  fetchInstance: fetchx,
  config: {
    baseURL: "https://dummyjson.com",
  },
  interceptors: {
    onBeforeRequest: (config) => {
      console.log("onBeforeRequest: ", config?.headers);
      config.headers.set("Content-Type", "application/json");
      config.headers.set("FOO", "BAR");
      return config;
    },
    onAfterRequest: (config) => {
      console.log("onAfterRequest: ", config?.headers);
      return config;
    },
    onBeforeResponse: (response) => {
      console.log("onBeforeResponse: ", response?.headers);
      return response;
    },
    onError: (error) => {
      console.log("onError", error);
      return error;
    },
  },
});

app.get("/products", async (req, res) => {
  try {
    const response = await vFetch(`${config?._config?.baseURL}/products/1`, {
      vOptions: {
        cache: "memory",
        responseType: "text",
      },
      method: "PUT" /* or PATCH */,
      body: JSON.stringify({
        title: "iPhone Galaxy +1",
      }),
    });
    res.json(response?.value || response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
