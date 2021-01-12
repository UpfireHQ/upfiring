const assertRevert = require('../helpers/assertRevert');
const sleep = (sec) => new Promise((resolve) => setTimeout(resolve, 1000 * sec))
const TokenMock = artifacts.require('TokenMock');
const UpfiringStore = artifacts.require('UpfiringStore');
const Upfiring = artifacts.require('Upfiring');

contract('Upfiring', function ([_, owner, recipient]) {

  console.log([_, owner, recipient]);

  const address1 = '0x09fd223506d9382166fc2153e570c688b44f780c';
  const address2 = '0xe9767bc63bf2d708d8024042f23f30e145a901bb';
  const address3 = '0xf4467608c01942d880f4921ad2ba48523eb68041';
  const address4 = '0x4c594ce9a8599f8c0a94122047b78ed895bd4a16';

  const TORRENT_HASH = 'YDRDIYTDTFKKUDFYTDITOUYGUYFUYFYTDURDTSYRESUTRER';

  beforeEach(async function () {
    this.token = await TokenMock.new(owner, 100000000000000);
    this.store = await UpfiringStore.new();
    this.upfiring = await Upfiring.new(this.store.address, this.token.address, 50, 3, 0);
    await this.store.transferOwnership(this.upfiring.address);

    await this.token.approve(this.upfiring.address, 10000000, {from: owner});
    await this.upfiring.refill(10000000, {from: owner});
  });

  it('check owner', async function () {
    assert.equal(await this.upfiring.owner(), _);
  });
  it('refill', async function () {
    const balance = await this.upfiring.balanceOf(owner);
    assert.equal(balance, 10000000);
  });

  it('withdraw if enough', async function () {
    await this.upfiring.withdraw(2000000, {from: owner});

    const balance = await this.upfiring.balanceOf(owner);
    assert.equal(balance, 8000000);
  });

  it('withdraw if not enough', async function () {
    await assertRevert(this.upfiring.withdraw(20000000, {from: owner}))
  });

  describe('pay', function () {
    it('when owner && seeders && free seeders', async function () {
      const {logs}=await this.upfiring.pay(TORRENT_HASH, 85000, recipient, [address1], [address2], {from: owner});
      const check = await this.upfiring.check(TORRENT_HASH, owner);
      assert.equal(check, 85000);

      const balanceRecipient = +await this.upfiring.balanceOf(recipient);
      assert.equal(balanceRecipient, 42500);

      const balanceAddress1 = +await this.upfiring.balanceOf(address1);
      assert.equal(balanceAddress1, 31875);

      const balanceAddress2 = +await this.upfiring.balanceOf(address2);
      assert.equal(balanceAddress2, 10625);

      assert.equal(+await this.upfiring.totalReceivingOf(recipient), 42500);
      assert.equal(+await this.upfiring.totalReceivingOf(address1), 31875);
      assert.equal(+await this.upfiring.totalReceivingOf(address2), 10625);
      assert.equal(+await this.upfiring.totalSpendingOf(owner), 85000);

    });

    it('when owner && seeders', async function () {
      await this.upfiring.pay(TORRENT_HASH, 102, recipient, [address4], [], {from: owner});

      const check = await this.upfiring.check(TORRENT_HASH, owner);
      assert.equal(check, 102);

      const balance = await this.upfiring.balanceOf(recipient);
      assert.equal(balance, 51);

      const balanceAddress4 = await this.upfiring.balanceOf(address4);
      assert.equal(balanceAddress4, 51);
    });

    it('when owner && free seeders', async function () {
      await this.upfiring.pay(TORRENT_HASH, 102, recipient, [], [address3], {from: owner});

      const check = await this.upfiring.check(TORRENT_HASH, owner);
      assert.equal(check, 102);

      const balance = await this.upfiring.balanceOf(recipient);
      assert.equal(balance, 51);

      const balanceAddress3 = await this.upfiring.balanceOf(address3);
      assert.equal(balanceAddress3, 51);
    });

    it('when only owner', async function () {
      await this.upfiring.pay(TORRENT_HASH, 50, recipient, [], [], {from: owner});

      const check = await this.upfiring.check(TORRENT_HASH, owner);
      assert.equal(check, 50);

      const balance = await this.upfiring.balanceOf(recipient);
      assert.equal(balance, 50);
    });

    it('setAvailablePaymentTime', async function () {
      await this.upfiring.setAvailablePaymentTime(2, {from: _});
      assert.equal(+await this.upfiring.availablePaymentTime(),2);
      await this.upfiring.setAvailablePaymentTime(10, {from: _});
      assert.equal(+await this.upfiring.availablePaymentTime(),10);
    });

    it('setSeedersProfitMargin', async function () {
      await this.upfiring.setSeedersProfitMargin(2, {from: _});
      assert.equal(+await this.upfiring.seedersProfitMargin(),2);
    });
    it('setTorrentOwnerPercent', async function () {
      await this.upfiring.setTorrentOwnerPercent(10, {from: _});
      assert.equal(+await this.upfiring.torrentOwnerPercent(),10);
    });

    it('check payment available time = 0', async function () {
      await this.upfiring.setAvailablePaymentTime(0, {from: _});

      await this.upfiring.pay(TORRENT_HASH, 50, recipient, [], [], {from: owner});

      assert.equal(+await this.upfiring.check(TORRENT_HASH, owner), 0);

     // assert.equal(+await this.upfiring.balanceOf(recipient), 50);
    });
  });

});
