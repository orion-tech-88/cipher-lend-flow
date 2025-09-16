const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CipherLend contract...");

  // Get the contract factory
  const CipherLend = await ethers.getContractFactory("CipherLend");

  // Deploy the contract
  // You'll need to provide the risk assessor and verifier addresses
  const riskAssessor = process.env.RISK_ASSESSOR_ADDRESS || "0x0000000000000000000000000000000000000000"; // Replace with actual address
  const verifier = process.env.VERIFIER_ADDRESS || "0x0000000000000000000000000000000000000000"; // Replace with actual address

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
