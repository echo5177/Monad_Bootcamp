import assert from "node:assert/strict";
import test from "node:test";

import {
  FEEDS,
  decodePriceResponse,
  encodeGetPriceNoOlderThan,
  formatScaled,
  freshnessState,
} from "../docs/price-utils.mjs";

test("encodes getPriceNoOlderThan calldata", () => {
  const data = encodeGetPriceNoOlderThan(FEEDS.MON_USD.id, 3600);
  assert.equal(data.slice(0, 10), "0xa4ae35e0");
  assert.equal(data.length, 2 + 8 + 64 + 64);
  assert.equal(data.slice(-4), "0e10");
});

test("decodes signed Pyth fields", () => {
  const result = [
    2_076_115n.toString(16).padStart(64, "0"),
    1_653n.toString(16).padStart(64, "0"),
    ((1n << 256n) - 8n).toString(16).padStart(64, "f"),
    1_785_508_300n.toString(16).padStart(64, "0"),
  ].join("");

  assert.deepEqual(decodePriceResponse(`0x${result}`), {
    price: 2_076_115n,
    conf: 1_653n,
    expo: -8,
    publishTime: 1_785_508_300,
  });
});

test("formats fixed-point values without scientific notation", () => {
  assert.equal(formatScaled(2_076_115n, -8), "0.02076115");
  assert.equal(formatScaled(12_345_678_900n, -8), "123.456789");
  assert.equal(formatScaled(-125n, -2), "-1.25");
});

test("classifies freshness against the selected maxAge", () => {
  assert.deepEqual(freshnessState(10, 60), { key: "fresh", label: "FRESH" });
  assert.deepEqual(freshnessState(45, 60), { key: "aging", label: "AGING" });
  assert.deepEqual(freshnessState(61, 60), { key: "stale", label: "STALE" });
});
