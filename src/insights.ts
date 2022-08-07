import { ETH_MAINNET_WSS_URL } from "./config";
import { BigNumber, ethers, providers } from "ethers";

export async function getInsights() {
  console.log(
    "the address that's sending the most transactions =",
    mostTxAddress
  );
  console.log(
    "the most common address that users send transactions to =",
    mostToAddress
  );
  console.log("the hash of the most commonly used method =", mostFunctionHash);
  console.log(
    "the highest value sent in a single transaction =",
    ethers.utils.formatEther(highestValue),
    "ethers"
  );
  console.log(
    "the average maxFeePerGas =",
    ethers.utils.formatUnits(maxFeePerGasStats.average, 9),
    "gwei"
  );
  console.log(
    "the average maxPriorityFeePerGas =",
    ethers.utils.formatUnits(maxPriorityFeePerGasStats.average, 9),
    "gwei"
  );
  console.log(new Date().toLocaleString());
}

export const mostTxAddress = { address: "", count: 0 };
export const mostToAddress = { address: "", count: 0 };
export const mostFunctionHash = { functionHash: "", count: 0 };
export let highestValue = BigNumber.from(0);
export const maxFeePerGasStats = {
  average: BigNumber.from(0),
  sum: BigNumber.from(0),
  count: 0,
};
export const maxPriorityFeePerGasStats = {
  average: BigNumber.from(0),
  sum: BigNumber.from(0),
  count: 0,
};

export async function streamPendingTx() {
  const fromAddressMap = {};
  const toAddressMap = {};
  const functionHashMap = {};

  const wssProvider = new providers.WebSocketProvider(ETH_MAINNET_WSS_URL);
  wssProvider.on("pending", async (txhash) => {
    const txInfo = await wssProvider.getTransaction(txhash);
    if (txInfo == null) {
      return;
    }
    calculateFromAddressCount(fromAddressMap, txInfo);
    calculateToAddressCount(toAddressMap, txInfo);
    calculateFunctionSignatureHashCount(
      functionHashMap,
      getFuncSigHash(txInfo.data)
    );
    findTheHighestValue(txInfo.value);
    if (txInfo.maxFeePerGas != undefined) {
      calculateAverage(maxFeePerGasStats, txInfo.maxFeePerGas);
    }
    if (txInfo.maxPriorityFeePerGas != undefined) {
      calculateAverage(maxPriorityFeePerGasStats, txInfo.maxPriorityFeePerGas);
    }
  });
}

function calculateFromAddressCount(addressMap, txInfo) {
  if (addressMap[txInfo.from] == undefined) {
    addressMap[txInfo.from] = 1;
  } else {
    addressMap[txInfo.from]++;
    if (addressMap[txInfo.from] > mostTxAddress.count) {
      mostTxAddress.address = txInfo.from;
      mostTxAddress.count = addressMap[txInfo.from];
    }
  }
}

function calculateToAddressCount(addressMap, txInfo) {
  if (addressMap[txInfo.to] == undefined) {
    addressMap[txInfo.to] = 1;
  } else {
    addressMap[txInfo.to]++;
    if (addressMap[txInfo.to] > mostToAddress.count) {
      mostToAddress.address = txInfo.to;
      mostToAddress.count = addressMap[txInfo.to];
    }
  }
}

function getFuncSigHash(input: string) {
  return input.slice(2, 9);
}

function calculateFunctionSignatureHashCount(funcHashMap, hash) {
  if (hash === "") {
    return;
  }
  if (funcHashMap[hash] == undefined) {
    funcHashMap[hash] = 1;
  } else {
    funcHashMap[hash]++;
    if (funcHashMap[hash] > mostFunctionHash.count) {
      mostFunctionHash.functionHash = hash;
      mostFunctionHash.count = funcHashMap[hash];
    }
  }
}

function findTheHighestValue(value: BigNumber) {
  if (value.gt(highestValue)) {
    highestValue = value;
  }
}

function calculateAverage(stats, fee: BigNumber) {
  stats.sum = stats.sum.add(fee);
  stats.count++;
  stats.average = stats.sum.div(BigNumber.from(stats.count));
}
