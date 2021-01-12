pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./UpfiringStore.sol";

contract Upfiring is Ownable {

  using SafeMath for uint;

  ERC20 public token;

  UpfiringStore public store;

  uint8 public torrentOwnerPercent = 50;

  uint8 public seedersProfitMargin = 3;

  uint public availablePaymentTime = 86400; //seconds

  uint public minWithdraw = 0;

  event Payment(string _torrent, uint _amount, address indexed _from);

  event Refill(address indexed _to, uint _amount);

  event Withdraw(address indexed _to, uint _amount);

  event Pay(address indexed _to, uint _amount, bytes32 _hash);

  event ChangeBalance(address indexed _to, uint _balance);

  event LogEvent(string _log);

  function Upfiring(UpfiringStore _store, ERC20 _token, uint8 _torrentOwnerPercent, uint8 _seedersProfitMargin, uint _minWithdraw) public {
    require(_store != address(0));
    require(_token != address(0));
    require(_torrentOwnerPercent != 0);
    require(_seedersProfitMargin != 0);

    store = _store;
    token = _token;
    torrentOwnerPercent = _torrentOwnerPercent;
    seedersProfitMargin = _seedersProfitMargin;
    minWithdraw = _minWithdraw;
  }

  function() external payable {
    revert();
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return store.balanceOf(_owner);
  }

  function totalReceivingOf(address _owner) public view returns (uint balance) {
    return store.totalReceivingOf(_owner);
  }

  function totalSpendingOf(address _owner) public view returns (uint balance) {
    return store.totalSpendingOf(_owner);
  }

  function check(string _torrent, address _from) public view returns (uint amount) {
    return store.check(torrentToHash(_torrent), _from, availablePaymentTime);
  }

  function torrentToHash(string _torrent) internal pure returns (bytes32 _hash)  {
    return sha256(_torrent);
  }

  function refill(uint _amount) external {
    require(_amount != uint(0));

    require(token.transferFrom(msg.sender, address(this), _amount));
    store.addBalance(msg.sender, _amount);

    ChangeBalance(msg.sender, store.balanceOf(msg.sender));
    Refill(msg.sender, _amount);
  }

  function withdraw(uint _amount) external {
    require(_amount >= minWithdraw);
    require(token.balanceOf(address(this)) >= _amount);

    require(store.subBalance(msg.sender, _amount));
    require(token.transfer(msg.sender, _amount));

    ChangeBalance(msg.sender, store.balanceOf(msg.sender));
    Withdraw(msg.sender, _amount);
  }

  function pay(string _torrent, uint _amount, address _owner, address[] _seeders, address[] _freeSeeders) external {
    require(_amount != uint(0));
    require(_owner != address(0));

    bytes32 _hash = torrentToHash(_torrent);

    require(store.subBalance(msg.sender, _amount));
    store.payment(_hash, msg.sender, _amount);

    Payment(_torrent, _amount, msg.sender);
    ChangeBalance(msg.sender, store.balanceOf(msg.sender));

    sharePayment(_hash, _amount, _owner, _seeders, _freeSeeders);
  }

  function sharePayment(bytes32 _hash, uint _amount, address _owner, address[] _seeders, address[] _freeSeeders) internal {
    if ((_seeders.length + _freeSeeders.length) == 0) {
      payTo(_owner, _amount, _hash);
    } else {
      uint _ownerAmount = _amount.mul(torrentOwnerPercent).div(100);
      uint _otherAmount = _amount.sub(_ownerAmount);

      uint _realOtherAmount = shareSeeders(_seeders, _freeSeeders, _otherAmount, _hash);
      payTo(_owner, _amount.sub(_realOtherAmount), _hash);
    }
  }

  function shareSeeders(address[] _seeders, address[] _freeSeeders, uint _amount, bytes32 _hash) internal returns (uint){
    uint _dLength = _freeSeeders.length.add(_seeders.length.mul(seedersProfitMargin));
    uint _dAmount = _amount.div(_dLength);

    payToList(_seeders, _dAmount.mul(seedersProfitMargin), _hash);
    payToList(_freeSeeders, _dAmount, _hash);

    return _dLength.mul(_dAmount);
  }

  function payToList(address[] _seeders, uint _amount, bytes32 _hash) internal {
    if (_seeders.length > 0) {
      for (uint i = 0; i < _seeders.length; i++) {
        address _seeder = _seeders[i];
        payTo(_seeder, _amount, _hash);
      }
    }
  }

  function payTo(address _to, uint _amount, bytes32 _hash) internal {
    require(store.addBalance(_to, _amount));

    Pay(_to, _amount, _hash);
    ChangeBalance(_to, store.balanceOf(_to));
  }

  function migrateStore(address _to) onlyOwner public {
    store.transferOwnership(_to);
  }

  function setAvailablePaymentTime(uint _availablePaymentTime) onlyOwner public {
    availablePaymentTime = _availablePaymentTime;
  }

  function setSeedersProfitMargin(uint8 _seedersProfitMargin) onlyOwner public {
    seedersProfitMargin = _seedersProfitMargin;
  }

  function setTorrentOwnerPercent(uint8 _torrentOwnerPercent) onlyOwner public {
    torrentOwnerPercent = _torrentOwnerPercent;
  }

  function setMinWithdraw(uint _minWithdraw) onlyOwner public {
    minWithdraw = _minWithdraw;
  }
}
