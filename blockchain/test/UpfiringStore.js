const assertRevert = require('../helpers/assertRevert')
const UpfiringStore = artifacts.require('UpfiringStore')
const availableTime = 86400



contract('UpfiringStore', function ([_, owner, recipient]) {

  beforeEach(async function () {
    this.store = await UpfiringStore.new()
  })

  it('make payment and check', async function () {
    const hash = '0x0000000000000000000000000000000000000000000000000000000000000001'

    await this.store.payment(hash, recipient, 100)
    const check = await this.store.check(hash, recipient, availableTime)
    assert.equal(check, 100)
  })

  it('add balance', async function () {
    await this.store.addBalance(recipient, 100)

    const check = await this.store.balanceOf(recipient)
    assert.equal(check, 100)
  })

  it('sub balance', async function () {
    await this.store.addBalance(recipient, 100)
    await this.store.subBalance(recipient, 50)

    const check = await this.store.balanceOf(recipient)
    assert.equal(check, 50)
  })

  it('sub over balance', async function () {
    await assertRevert(this.store.subBalance(recipient, 500))
  })

})
