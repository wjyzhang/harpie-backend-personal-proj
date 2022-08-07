import { getInsights, streamPendingTx } from "./insights";

const main = () => {
  console.log("reporting all the insights");
  setInterval(async () => {
    await getInsights();
  }, 10000);
};

streamPendingTx();

main();
