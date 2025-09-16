const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CipherLend contract...");

  // Get the contract factory
  const CipherLend = await ethers.getContractFactory("CipherLend");

  // Deploy the contract
  // You'll need to provide the risk assessor and verifier addresses
  const riskAssessor = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual address
  const verifier = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual address

  const cipherLend = await CipherLend.deploy(riskAssessor, verifier);

  await cipherLend.waitForDeployment();

  const contractAddress = await cipherLend.getAddress();
  console.log("CipherLend deployed to:", contractAddress);

  // Save the contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './contract-address.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract address saved to contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
