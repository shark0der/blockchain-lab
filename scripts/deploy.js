const { ethers } = require('hardhat');

async function main () {

  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY);
  const Dice = await ethers.getContractFactory('Dice', deployer);

  // deploy
  const dice = await Dice.deploy();
  console.log('Transaction sent: ', dice.deployTransaction.hash);

  await dice.deployed();

  // fund
  await dice.fund({ value: ethers.utils.parseEther('100') });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
