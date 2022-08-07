import {
  getInsights,
  highestValue,
  maxFeePerGasStats,
  maxPriorityFeePerGasStats,
  mostFunctionHash,
  mostToAddress,
  mostTxAddress,
  streamPendingTx,
} from "./insights";
import * as ethers from "ethers";
import { BigNumber } from "ethers";

jest.mock("ethers", () => ({
  ...jest.requireActual("ethers"),
  providers: {
    WebSocketProvider: {},
  },
}));

type Transaction = {
  hash: string;
  from: string;
  to: string;
  value: BigNumber;
  data: string;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
};

describe("mempool insights", () => {
  const transactionsList: Transaction[] = [
    {
      hash: "0x1",
      from: "0xC08c75095c291AF99756387d97029b31D45a1049",
      to: "0x8f3e83d908aAAea4D2351c3597B732a72841cEf7",
      value: BigNumber.from(71048),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(1),
      maxPriorityFeePerGas: BigNumber.from(1),
    },
    {
      hash: "0x2",
      from: "0xC08c75095c291AF99756387d97029b31D45a1049",
      to: "0x8f3e83d908aAAea4D2351c3597B732a72841cEf7",
      value: BigNumber.from(55537),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(2),
      maxPriorityFeePerGas: BigNumber.from(2),
    },
    {
      hash: "0x3",
      from: "0xC08c75095c291AF99756387d97029b31D45a1049",
      to: "0x9CF6e4Eb404d75d6630B0c01DeaE4aC9DaA7D399",
      value: BigNumber.from(71373),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(3),
      maxPriorityFeePerGas: BigNumber.from(3),
    },
    {
      hash: "0x4",
      from: "0xC08c75095c291AF99756387d97029b31D45a1049",
      to: "0x323c12e0A450456bD2912749bA45f3C5DBCf0d86",
      value: BigNumber.from(40923),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(4),
      maxPriorityFeePerGas: BigNumber.from(4),
    },
    {
      hash: "0x5",
      from: "0x393009aAd475dC4f871112e55b2671935645Ba3F",
      to: "0x106CF96A255Ef5E228515522a75FD387D6f51B7B",
      value: BigNumber.from(53820),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(5),
      maxPriorityFeePerGas: BigNumber.from(5),
    },
    {
      hash: "0x6",
      from: "0x99D7ca5182F9CB41c1888814FB8A99F6Ee13508b",
      to: "0xF77BF16139CD0dc427723A6260C66A807BF6E9cA",
      value: BigNumber.from(27750),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(6),
      maxPriorityFeePerGas: BigNumber.from(6),
    },
    {
      hash: "0x7",
      from: "0x12356E35BE82bB00651c29E7dD7e6132163661AB",
      to: "0x89C10A4B1B3f0316D274AFE27071DC247388aCEC",
      value: BigNumber.from(9431),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(7),
      maxPriorityFeePerGas: BigNumber.from(7),
    },
    {
      hash: "0x8",
      from: "0x52bFb4edCc6f35365402fE28068B4269a5046d75",
      to: "0xd9573f8F28aA3012BCc0947e8dB8aC6B434D7fe5",
      value: BigNumber.from(41080),
      data: "0xfb0f3ee10000",
      maxFeePerGas: BigNumber.from(8),
      maxPriorityFeePerGas: BigNumber.from(8),
    },
    {
      hash: "0x9",
      from: "0x9c4F15e625162147Fc5DF9F6f2a4A7159545fcb1",
      to: "0x996749a411e44b3A09B6811976cFC25bB7861c30",
      value: BigNumber.from(35722),
      data: "0x",
      maxFeePerGas: undefined,
      maxPriorityFeePerGas: undefined,
    },
    {
      hash: "0x10",
      from: "0x7e6c4536E21643Bf2c54d328ca47cCFe7C8f9B2E",
      to: "0x8f3e83d908aAAea4D2351c3597B732a72841cEf7",
      value: BigNumber.from(81878),
      data: "0x",
      maxFeePerGas: undefined,
      maxPriorityFeePerGas: undefined,
    },
  ];
  test("getInsights", async () => {
    // @ts-ignore
    ethers.providers.WebSocketProvider = jest.fn(() => ({
      on: jest.fn((eventName, listener) => {
        console.log("in on with message", eventName);
        [...Array(10)].map((_, index) => listener(index));
      }),
      getTransaction: jest.fn((index) => transactionsList[index]),
    }));
    await streamPendingTx();
    await getInsights();
    expect(mostTxAddress.count).toEqual(4);
    expect(mostTxAddress.address).toEqual(
      "0xC08c75095c291AF99756387d97029b31D45a1049"
    );
    expect(mostToAddress.count).toEqual(3);
    expect(mostToAddress.address).toEqual(
      "0x8f3e83d908aAAea4D2351c3597B732a72841cEf7"
    );
    expect(mostFunctionHash.count).toEqual(8);
    expect(mostFunctionHash.functionHash).toEqual("fb0f3ee");
    expect(highestValue).toEqual(BigNumber.from(81878));
    expect(maxFeePerGasStats.average).toEqual(
      BigNumber.from(36).div(BigNumber.from(8))
    );
    expect(maxPriorityFeePerGasStats.average).toEqual(
      BigNumber.from(36).div(BigNumber.from(8))
    );
  });
});
