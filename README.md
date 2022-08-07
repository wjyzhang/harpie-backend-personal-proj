# Harpie Backend/Data Engineer Personal Project

# TASK: Write code that logs a live feed of these data insights from the Ethereum mempool (measure starting from the moment you start the program)
* the address that's sending the most transactions
* most common address that users send transactions to
* the hash of the most commonly used method (to find this, inspect the first four bytes of `data`)
* the highest `value` sent in a single transaction
* the average `maxFeePerGas`
* the average `maxPriorityFeePerGas`

## INSTRUCTIONS:
* `npm i`
* run using the command `npm run start`
* run unit tests `npm t`
* create your own QuickNode account and source mempool data from there, the free plan should be fine
* for your personal security, I'd advise putting your quicknode URL in a gitignored `.env` file

## SPECS: 
* log your insights every 10 seconds (in any method of your choosing; console.log is fine)
* data should be sourced from the Ethereum Mainnet
* algorithmic efficiency will be tested (i.e. minimize your number of quadratic functions, etc.)
    * that said, we understand that the time limit is tight, so we will be lenient on this category
* code readability will be tested
* you will be paid $59/hour for up to 8 hours, please make sure to log your time on a document

## HINTS:
* not every transaction will have a large `data` field... some may just contain "0x"
* not every transaction has the `maxPriorityFeePerGas` or `maxFeePerGas` field
* send an email if you get stuck

## LINKS:
* QuickNode: https://quicknode.com
* ethers.js transactions spec: https://docs.ethers.io/v5/api/utils/transactions/
* decoding Ethereum transaction call data: https://towardsdatascience.com/decoding-ethereum-smart-contract-data-eed513a65f76

Good luck!