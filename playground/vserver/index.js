import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
