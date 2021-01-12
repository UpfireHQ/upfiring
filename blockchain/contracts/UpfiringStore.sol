pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract UpfiringStore is Ownable {

  using SafeMath for uint;

  mapping(bytes32 => mapping(address => uint)) private payments;
  mapping(bytes32 => mapping(address => uint)) private paymentDates;

  mapping(address => uint) private balances;
  mapping(address => uint) private totalReceiving;
  mapping(address => uint) private totalSpending;

  function UpfiringStore() public {}

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }

  function totalReceivingOf(address _owner) public view returns (uint balance) {
    return totalReceiving[_owner];
  }

  function totalSpendingOf(address _owner) public view returns (uint balance) {
    return totalSpending[_owner];
  }

  function check(bytes32 _hash, address _from, uint _availablePaymentTime) public view returns (uint amount) {
    uint _amount = payments[_hash][_from];
    uint _date = paymentDates[_hash][_from];
    if (_amount > 0 && (_date + _availablePaymentTime) > now) {
      return _amount;
    } else {
      return 0;
    }
  }

  function payment(bytes32 _hash, address _from, uint _amount) onlyOwner public returns (bool result) {
    payments[_hash][_from] = payments[_hash][_from].add(_amount);
    paymentDates[_hash][_from] = now;
    return true;
  }

  function subBalance(address _owner, uint _amount) onlyOwner public returns (bool result) {
    require(balances[_owner] >= _amount);
    balances[_owner] = balances[_owner].sub(_amount);
    totalSpending[_owner] = totalSpending[_owner].add(_amount);
    return true;
  }

  function addBalance(address _owner, uint _amount) onlyOwner public returns (bool result) {
    balances[_owner] = balances[_owner].add(_amount);
    totalReceiving[_owner] = totalReceiving[_owner].add(_amount);
    return true;
  }

}
