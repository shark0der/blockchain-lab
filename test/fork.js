const { ethers } = require('hardhat');

describe('Dice', function () {

  it('is deployed', async function () {

    // const provider = ethers.provider;
    // const attacker = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const [attacker] = await ethers.getSigners();

    // deploy
    const DICE_ADDRESS = '0x48848d4b184D54689bCF7C731Fe31c945835C2c1';
    const dice = await ethers.getContractAt('Dice', DICE_ADDRESS);

    // pass params
    this.dice = dice;
    this.attacker = attacker;
  });

  const run = async (file, dice, attacker) => {

    const balanceBefore = await ethers.provider.getBalance(attacker.address);

    const exploit = require(file);
    await exploit(dice, attacker);

    const balanceAfter = await ethers.provider.getBalance(attacker.address);
    console.log('Profit: ', ethers.utils.formatEther(balanceAfter.sub(balanceBefore)));
  };

  it('is exploitable 1', async function () {
    const { dice, attacker } = this;
    await run('./exploits/dice1.js', dice, attacker);
  });

  it('is exploitable 2', async function () {
    const { dice, attacker } = this;
    await run('./exploits/dice2.js', dice, attacker);
  });

});
