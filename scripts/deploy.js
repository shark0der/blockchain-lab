const { ethers } = require('hardhat');
const { PROVIDER_URL, PRIVATE_KEY } = process.env;

async function main () {

  const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
  const deployer = new ethers.Wallet(PRIVATE_KEY, provider);
  const Dice = await ethers.getContractFactory('Dice', deployer);

  // deploy
  const dice = await Dice.deploy();
  console.log('Deploy tx: ', dice.deployTransaction.hash);

  await dice.deployed();

  // fund
  const tx = await dice.fund({ value: ethers.utils.parseEther('100') });
  console.log('Fund tx: ', tx.hash);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
