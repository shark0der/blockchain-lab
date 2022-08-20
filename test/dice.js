const { ethers } = require('hardhat');

describe('Dice', function () {

  it('is deployable', async function () {

    const [deployer, attacker] = await ethers.getSigners();

    // deploy
    const Dice = await ethers.getContractFactory('Dice', deployer);
    const dice = await Dice.deploy();
    await dice.deployed();

    // fund
    const fundTx = await dice.fund({ value: ethers.utils.parseEther('100') });
    await fundTx.wait();

    // pass params
    this.dice = dice;
    this.deployer = deployer;
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
