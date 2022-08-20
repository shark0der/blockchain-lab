# Simple Ethereum Exploit Project

## Presentation

Here: [Smart contract hacking](https://docs.google.com/presentation/d/1lE6GQHRqxcCY1SZZlo0buCmeyo1J5eQ5B3vdl8aNSdM/edit)

## Spin a local ethereum node

1. Copy .env to .env.sample and fill up with your private/miner keys, miner address and RPC URL (see below).
2. Run `ERIGON_URL=http://127.0.0.1:8545 docker-compose up`

Exposed endpoints:

- RPC URL: `http://127.0.0.1:8545`
- Otterscan: `http://127.0.0.1:8080`

## Install deps

```bash
npm install
```

## Compile the contracts

```bash
npx hardhat compile
```

## Run exploits locally

```bash
npx hardhat test test/dice.js
npx hardhat test test/fixeddice.js
```

## Deploy the contracts to the local ethereum node

```bash
node scripts/deploy.js
```

## Run exploits on a forked network:

```bash
FORK=1 node scripts/fork.js
```
