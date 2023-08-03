import express from "express";
import axios from "axios";

const app = express();

const symbols = ["BTCUSD", "ETHUSD", "LTCUSD", "LTCBTC", "ETHBTC"];

const axiosInstance = axios.create();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1000;

axiosInstance.interceptors.response.use(undefined, async (err) => {
  const config = err.config;

  if (!config || !config.retry) {
    throw err;
  }

  config.retryCount = config.retryCount || 0;
  if (config.retryCount >= MAX_RETRIES) {
    throw err;
  }

  config.retryCount += 1;

  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));

  return axiosInstance(config);
});

app.get("/api/bitfinex/:symbol", async (req, res) => {
  const { symbol } = req.params;
  if (!symbols.includes(symbol.toUpperCase())) {
    return res.status(400).send("Invalid symbol");
  }

  const url = `https://api.bitfinex.com/v1/pubticker/${symbol.toUpperCase()}`;

  try {
    const response = await axiosInstance.get(url, { retry: true });
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Bitfinex API:", error);
    res.status(500).send("Error fetching data from Bitfinex API");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
