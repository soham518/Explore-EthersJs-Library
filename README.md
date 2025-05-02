# Ethers V6 Examples
Learn about Ethers.js v6 w/ example scripts.

## Technology Stack & Tools

- Javascript (Writing scripts)
- [Node.js](https://nodejs.org/en/)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Alchemy](https://www.alchemy.com/) (Node provider)
- [Tenderly](https://tenderly.co/) (Virtual testnet)

## Requirements For Initial Setup

- Install [NodeJS](https://nodejs.org/en/). We recommend using the latest LTS (Long-Term-Support) version, and preferably installing NodeJS via [NVM](https://github.com/nvm-sh/nvm#intro).

> **Note for Windows Users:** We highly recommend installing and using [WSL Ubuntu](https://learn.microsoft.com/en-us/windows/wsl/install) for building projects.

- Create an [Alchemy](https://www.alchemy.com/) account, you'll need to create an app for the Ethereum chain, on the mainnet network

- Create a [Tenderly](https://tenderly.co/) account, you'll need to create a project and a virtual testnet with the parent chain as Ethereum mainnet.

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
```bash
npm install
```

### 3. Setup Environment Variables
Before running any scripts, you'll want to create a **.env** file with the following values (see **.env.example**):

- **ALCHEMY_API_KEY=""**
- **TENDERLY_RPC_URL=""**

## Running Scripts

### 1_accounts.js - Reading ETH Balance
```bash
node examples/1_accounts.js
```

### 2_send_signed_transactions.js - Sending ETH
```bash
node examples/2_send_signed_transactions.js
```

### 3_read_smart_contracts.js - Read USDC Balance
```bash
node examples/3_read_smart_contracts.js
```

### 4_write_smart_contracts.js - Send USDC
```bash
node examples/4_write_smart_contracts.js
```

### 5_contract_events.js - Query Contract Events
```bash
node examples/5_contract_events.js
```