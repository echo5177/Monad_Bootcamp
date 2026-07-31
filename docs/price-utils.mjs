export const PYTH_CONTRACT = "0x2880aB155794e7179c9eE2e38200202908C17B43";
export const RPC_URL = "https://rpc.monad.xyz";
export const FUNCTION_SELECTOR = "0xa4ae35e0";

export const FEEDS = Object.freeze({
  MON_USD: {
    label: "MON / USD",
    id: "0x31491744e2dbf6df7fcf4ac0820d18a609b49076d45066d3568424e62f686cd1",
  },
  BTC_USD: {
    label: "BTC / USD",
    id: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  },
  ETH_USD: {
    label: "ETH / USD",
    id: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  },
});

const UINT_256 = 1n << 256n;
const INT_256_MAX = 1n << 255n;

export function encodeGetPriceNoOlderThan(feedId, maxAge) {
  const cleanFeedId = feedId.replace(/^0x/, "");
  if (!/^[0-9a-fA-F]{64}$/.test(cleanFeedId)) {
    throw new Error("Feed ID must be exactly 32 bytes.");
  }

  const age = BigInt(maxAge);
  if (age <= 0n || age > 86400n) {
    throw new Error("maxAge must be between 1 and 86400 seconds.");
  }

  return `${FUNCTION_SELECTOR}${cleanFeedId}${age.toString(16).padStart(64, "0")}`;
}

export function decodeSignedWord(word) {
  const value = BigInt(`0x${word}`);
  return value >= INT_256_MAX ? value - UINT_256 : value;
}

export function decodePriceResponse(result) {
  const clean = result.replace(/^0x/, "");
  if (!/^[0-9a-fA-F]+$/.test(clean) || clean.length < 256) {
    throw new Error("RPC returned an invalid Pyth response.");
  }

  const words = clean.match(/.{64}/g).slice(0, 4);
  return {
    price: decodeSignedWord(words[0]),
    conf: BigInt(`0x${words[1]}`),
    expo: Number(decodeSignedWord(words[2])),
    publishTime: Number(BigInt(`0x${words[3]}`)),
  };
}

function addThousands(value) {
  const [integer, fraction] = value.split(".");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fraction ? `${grouped}.${fraction}` : grouped;
}

export function formatScaled(value, expo, maximumFractionDigits = 8) {
  const negative = value < 0n;
  const absolute = negative ? -value : value;
  let digits = absolute.toString();
  let formatted;

  if (expo >= 0) {
    formatted = `${digits}${"0".repeat(expo)}`;
  } else {
    const decimals = -expo;
    digits = digits.padStart(decimals + 1, "0");
    const split = digits.length - decimals;
    const integer = digits.slice(0, split);
    const fraction = digits
      .slice(split, split + maximumFractionDigits)
      .replace(/0+$/, "");
    formatted = fraction ? `${integer}.${fraction}` : integer;
  }

  return `${negative ? "-" : ""}${addThousands(formatted)}`;
}

export function confidencePercent(price, conf) {
  if (price === 0n) return null;
  return (Number(conf) / Math.abs(Number(price))) * 100;
}

export function freshnessState(ageSeconds, maxAge) {
  if (ageSeconds < 0) return { key: "fresh", label: "FRESH" };
  if (ageSeconds <= maxAge / 2) return { key: "fresh", label: "FRESH" };
  if (ageSeconds <= maxAge) return { key: "aging", label: "AGING" };
  return { key: "stale", label: "STALE" };
}

export function relativeAge(seconds) {
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}
