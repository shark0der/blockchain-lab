const { ethers } = require('hardhat');

describe('FixedDice', function () {

  it('is deployable', async function () {

    const [deployer, attacker] = await ethers.getSigners();

    // deploy
    const FixedDice = await ethers.getContractFactory('FixedDice', deployer);
    const dice = await FixedDice.deploy();
    await dice.deployed();

    // fund
    await dice.fund({ value: ethers.utils.parseEther('100') });

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
    await run('./exploits/fixeddice1.js', dice, attacker);
  });

});
