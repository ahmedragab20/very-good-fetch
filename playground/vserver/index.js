import express from "express";
import fetchx from "node-fetch";
import { vFetch, vSetupConfig } from "../../library/dist/very-good-fetch.js";

const app = express();

app.use(express.json());

const config = vSetupConfig({
  fetchInstance: fetchx,
  config: {
    baseURL: "https://demo.dataverse.org/api",
    headers: {
      "Content-Type": "application/json",
    },
  },
});

app.get("/search", async (req, res) => {
  try {
    const term = req.query.searchTerm;
    const response = await vFetch(
      `${config?._config?.baseURL}/search?q=${term}`
    ).then((res) => res.json());
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
