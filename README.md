🔷 Coin BRON (Ethereum ERC-20)
Requirements:
✔ Name: BRON
✔ Maximum: 21,000,000 coins
✔ Network: Ethereum
✔ Smart contract support
✔ Mining capability (via mint/reward)

🧠 IMPORTANT ABOUT MINING
Ethereum does NOT support PoW mining of tokens.
Therefore, they use:
Mint mining (reward for action)
Staking
Off-chain майнинг (Python) + mint wards
⬇ Below is a real-life example.

🟡 1. BRON (Solidity) Smart Contract
This is an ERC-20 token with a supply limit of 21 million.
Can be deployed to Ethereum / Sepolia / Polygon
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BRON is ERC20, Ownable {

uint256 public constant MAX_SUPPLY = 21_000_000 * 10 ** 18;

constructor() ERC20("BRON", "BRON") {}

// "Mining" - Reward Release
function mine(address to, uint256 amount) external onlyOwner {
    require(totalSupply() + amount <= MAX_SUPPLY, "Max supply reached");
    _mint(to, amount);
}
}
What it can do:
✔ ERC-20 standard
✔ Smart contracts
✔ 21 million token limit
✔ Controlled issuance
✔ DeFi, NFT, and DAO support

🟣 2. Python Mining (Off-Chain)
Python mines, and the contract issues a reward
Installation:
pip install web3
BRON mining Python code:
from web3 import Web3
import time
import hashlib

Connecting to Ethereum
w3 = Web3(Web3.HTTPProvider("https://sepolia.infura.io/v3/YOUR_API_KEY"))

wallet = "0xYOUR_WALLET"
private_key = "YOUR_PRIVATE_KEY"
contract_address = "0xCONTRACT_ADDRESS"

abi = [...] # ABI of the BRON contract

contract = w3.eth.contract(address=contract_address, abi=abi)

difficulty = 4

def mine():
nonce = 0
while True:
text = f"BRON{nonce}".encode()
hash = hashlib.sha256(text).hexdigest()

    if hash.startswith("0" * difficulty):
        print("Блок найден:", hash)
        return nonce
    nonce += 1
while True:
nonce = mine()

tx = contract.functions.mine(
    wallet,
    w3.to_wei(10, 'ether')  # 10 BRON
).build_transaction({
    'from': wallet,
    'nonce': w3.eth.get_transaction_count(wallet),
    'gas': 200000,
    'gasPrice': w3.to_wei('20', 'gwei')
})

signed_tx = w3.eth.account.sign_transaction(tx, private_key)
w3.eth.send_raw_transaction(signed_tx.rawTransaction)

time.sleep(30)
✔ Python calculates
✔ Ethereum issues a reward
✔ A realistic approach

🔵 3. What you get
✔ Real cryptocurrency
✔ Smart contracts
✔ Limited supply
✔ Listing option
✔ DAO/DeFi option# WalletConnect-Community
This is a repo to submit your WalletConnect fun dev projects.
