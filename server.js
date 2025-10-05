const express = require("express");
const bodyParser = require("body-parser");
const { setKey, getKey } = require("./services/redisService");

const app = express();
app.use(bodyParser.json());

// POST -> store key-value
app.post("/set", async (req, res) => {
  const { key, value } = req.body;
  try {
    const message = await setKey(key, value);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET -> fetch value by key
app.get("/get/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const value = await getKey(key);
    if (value === null) return res.status(404).json({ error: "Key not found" });
    res.json({ key, value });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
