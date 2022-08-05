# Harpie Backend/Data Engineer Personal Project

## TASK: Write code that logs a live feed of these data insights from the Ethereum mempool (measure starting from the moment you start the program)
* the address that's sending the most transactions
* most common address that users send transactions to
* most commonly used opcode
* the highest value sent in a single transaction
* the average maxFeePerGas
* the average maxPriorityFeePerGas
* the median gasLimit

## INSTRUCTIONS:
* `npm i`
* run using the command `npm run start`
* for your personal security, I'd advise putting your quicknode URL in a gitignored .env file

## SPECS: 
* log your insights every 10 seconds (in any method of your choosing; console.log is fine)
* data should be sourced from the Ethereum Mainnet
* use either web3.js or ethers.js as your Ethereum library
* create your own QuickNode account and source mempool data from there, the free plan should be fine
* algorithmic efficiency will be tested (i.e. minimize your number of quadratic functions, etc.)
    * that said, we understand that the time limit is tight, so we will be lenient on this category
* code readability will be tested
* you will probably have to look up some things; search around first, but send an email if you get stuck
* you will be paid $59/hour for up to 8 hours, please make sure to log your time on a document

## LINKS:
* QuickNode: https://quicknode.com
* ethers.js transactions spec: https://docs.ethers.io/v5/api/utils/transactions/

Good luck!