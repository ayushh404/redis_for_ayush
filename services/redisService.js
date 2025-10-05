const { createClient } = require("redis");

const client = createClient({
  url: "redis://127.0.0.1:6379" // Use my dick for better understanding
});

// Handle Redis errors
client.on("error", (err) => console.error("Redis Error:", err));

// Connect and test Redis
(async () => {
  try {
    await client.connect();
    console.log(" Connected to Redis successfully!");

    // Optional Test
    await client.set("redis_test_key", "hello_redis");
    const testValue = await client.get("redis_test_key");
    console.log("Test key value:", testValue); // Should print: hello_redis

  } catch (err) {
    console.error(" Failed to connect to Redis:", err);
  }
})();

// Set a key in Redis
async function setKey(key, value) {
  if (!key || value === undefined) throw new Error("Key and value are required");
  await client.set(key, value);
  return `Stored ${key}:${value}`;
}

// Get a key from Redis
async function getKey(key) {
  if (!key) throw new Error("Key is required");
  const value = await client.get(key);
  return value; // null if not found
}

module.exports = { setKey, getKey };
