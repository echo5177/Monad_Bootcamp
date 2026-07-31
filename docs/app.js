import {
  FEEDS,
  PYTH_CONTRACT,
  RPC_URL,
  confidencePercent,
  decodePriceResponse,
  encodeGetPriceNoOlderThan,
  formatScaled,
  freshnessState,
  relativeAge,
} from "./price-utils.mjs";

const form = document.querySelector("#price-form");
const feedSelect = document.querySelector("#feed-select");
const ageSelect = document.querySelector("#age-select");
const queryButton = document.querySelector("#query-button");
const copyButton = document.querySelector("#copy-button");
const card = document.querySelector(".result-card");

const elements = {
  pair: document.querySelector("#pair-label"),
  freshness: document.querySelector("#freshness-badge"),
  price: document.querySelector("#price-value"),
  confidence: document.querySelector("#confidence-value"),
  publishedRelative: document.querySelector("#published-relative"),
  publishedExact: document.querySelector("#published-exact"),
  status: document.querySelector("#status-copy"),
  contract: document.querySelector("#contract-value"),
  feedId: document.querySelector("#feed-id-value"),
  rawPrice: document.querySelector("#raw-price"),
  rawConf: document.querySelector("#raw-conf"),
  rawExpo: document.querySelector("#raw-expo"),
  rawResponse: document.querySelector("#raw-response"),
};

elements.contract.textContent = PYTH_CONTRACT;
let latestSummary = "";

function setBadge(key, label) {
  elements.freshness.className = `freshness ${key}`;
  elements.freshness.textContent = label;
}

function setLoading(feed) {
  card.setAttribute("aria-busy", "true");
  queryButton.disabled = true;
  copyButton.disabled = true;
  queryButton.firstElementChild.textContent = "Reading Monad…";
  elements.pair.textContent = feed.label;
  elements.price.textContent = "…";
  elements.confidence.textContent = "…";
  elements.publishedRelative.textContent = "…";
  elements.publishedExact.textContent = "正在请求公共 RPC";
  elements.status.textContent = "正在执行只读 eth_call，不会触发钱包或交易。";
  setBadge("waiting", "QUERYING");
}

function setError(error) {
  card.setAttribute("aria-busy", "false");
  queryButton.disabled = false;
  queryButton.firstElementChild.textContent = "Retry from Monad";
  elements.price.textContent = "No result";
  elements.confidence.textContent = "—";
  elements.publishedRelative.textContent = "—";
  elements.publishedExact.textContent = "查询失败，没有展示缓存价格";
  elements.status.textContent = `${error.message} 若 maxAge 很小，合约也可能因数据超过阈值而拒绝查询。`;
  setBadge("error", "QUERY FAILED");
}

async function rpcCall(data) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "eth_call",
        params: [{ to: PYTH_CONTRACT, data }, "latest"],
      }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Monad RPC returned HTTP ${response.status}.`);
    const payload = await response.json();
    if (payload.error) throw new Error(payload.error.message || "The contract rejected this query.");
    if (!payload.result) throw new Error("Monad RPC returned no result.");
    return payload.result;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Monad RPC timed out after 12 seconds.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function renderResult(feed, maxAge, decoded, rawResponse) {
  const now = Math.floor(Date.now() / 1000);
  const age = Math.max(0, now - decoded.publishTime);
  const state = freshnessState(age, maxAge);
  const price = formatScaled(decoded.price, decoded.expo);
  const confidence = formatScaled(decoded.conf, decoded.expo);
  const confidenceRatio = confidencePercent(decoded.price, decoded.conf);
  const exactTime = new Date(decoded.publishTime * 1000).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  elements.pair.textContent = feed.label;
  elements.price.textContent = price;
  elements.confidence.textContent = `± $${confidence}`;
  elements.publishedRelative.textContent = relativeAge(age);
  elements.publishedExact.textContent = exactTime;
  elements.status.textContent = `这条数据发布于 ${age} 秒前，本次查询允许的最大数据年龄是 ${maxAge} 秒。`;
  elements.feedId.textContent = feed.id;
  elements.rawPrice.textContent = decoded.price.toString();
  elements.rawConf.textContent = decoded.conf.toString();
  elements.rawExpo.textContent = decoded.expo.toString();
  elements.rawResponse.textContent = rawResponse;
  setBadge(state.key, state.label);

  latestSummary = [
    `Monad Price Lens · ${feed.label}`,
    `Price: $${price}`,
    `Confidence: ±$${confidence}${confidenceRatio === null ? "" : ` (${confidenceRatio.toFixed(4)}%)`}`,
    `Published: ${exactTime} (${age}s ago)`,
    `Freshness: ${state.label} under maxAge=${maxAge}s`,
    `Pyth contract: ${PYTH_CONTRACT}`,
    `Feed ID: ${feed.id}`,
    "Read-only educational result. Not investment advice.",
  ].join("\n");

  card.setAttribute("aria-busy", "false");
  queryButton.disabled = false;
  queryButton.firstElementChild.textContent = "Read again";
  copyButton.disabled = false;
}

async function queryPrice() {
  const feed = FEEDS[feedSelect.value];
  const maxAge = Number(ageSelect.value);
  setLoading(feed);
  elements.feedId.textContent = feed.id;

  try {
    const callData = encodeGetPriceNoOlderThan(feed.id, maxAge);
    const rawResponse = await rpcCall(callData);
    const decoded = decodePriceResponse(rawResponse);
    renderResult(feed, maxAge, decoded, rawResponse);
  } catch (error) {
    setError(error instanceof Error ? error : new Error("Unknown query error."));
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  queryPrice();
});

feedSelect.addEventListener("change", () => {
  elements.pair.textContent = FEEDS[feedSelect.value].label;
  elements.feedId.textContent = FEEDS[feedSelect.value].id;
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(latestSummary);
    copyButton.textContent = "Copied";
    setTimeout(() => { copyButton.textContent = "Copy result summary"; }, 1600);
  } catch {
    copyButton.textContent = "Copy unavailable";
  }
});

elements.feedId.textContent = FEEDS.MON_USD.id;
