pragma solidity ^0.5.7;

contract MarginSwap {
  uint256 _code;
  uint256 _owner;
  uint256 _parent_address;
  uint256 _run_state;
  uint256 _comptroller_address;
  uint256[2**160] _compound_lookup;
  event Trade(
    address indexed trade_contract,
    address from_asset,
    address to_asset,
    uint256 input,
    uint256 output,
    uint256 input_fee
  );
  
  function () external payable  {}
  
  function setComptrollerAddress(address comptroller) external  {
    assembly {
      if xor(caller, sload(_owner_slot)) {
        mstore(32, 1)
        revert(63, 1)
      }
      sstore(_comptroller_address_slot, comptroller)
    }
  }
  
  function comptrollerAddress() public view 
  returns (address comptroller) {
    assembly {
      comptroller := sload(_comptroller_address_slot)
      if iszero(comptroller) {
        comptroller := 0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b
      }
    }
  }
  
  function lookupUnderlying(address cToken) public view 
  returns (address result) {
    assembly {
      result := sload(add(_compound_lookup_slot, cToken))
    }
  }
  
  function depositEth() external payable  {
    deposit(address(0x0), msg.value);
  }
  
  function deposit(address asset_address, uint256 amount) public payable  {
    
    uint256[4] memory m_in;
    
    uint256[1] memory m_out;
    assembly {
      if and(iszero(asset_address), iszero(eq(amount, callvalue))) {
        mstore(32, 1)
        revert(63, 1)
      }
      if asset_address {
        if callvalue {
          mstore(32, 2)
          revert(63, 1)
        }
        mstore(m_in, /* fn_hash("transferFrom(address,address,uint256)") */ 0x23b872dd00000000000000000000000000000000000000000000000000000000)
        mstore(add(m_in, 4), caller)
        mstore(add(m_in, 0x24), address)
        mstore(add(m_in, 0x44), amount)
        mstore(m_out, 0)
        let res := call(gas, asset_address, 0, m_in, 0x64, m_out, 0x20)
        if or(iszero(res), iszero(mload(m_out))) {
          mstore(32, 3)
          revert(63, 1)
        }
      }
    }
    depositToCompound(asset_address, amount);
  }
  
  function depositToCompound(address asset_address, uint256 amount) internal  {
    
    uint256[2] memory m_in;
    
    uint256[1] memory m_out;
    assembly {
      let c_address := sload(add(_compound_lookup_slot, asset_address))
      if iszero(c_address) {
        mstore(32, 100)
        revert(63, 1)
      }
      {
        mstore(m_in, /* fn_hash("borrowBalanceCurrent(address)") */ 0x17bfdfbc00000000000000000000000000000000000000000000000000000000)
        mstore(add(m_in, 4), address)
        let res := call(gas, c_address, 0, m_in, 36, m_out, 32)
        if iszero(res) {
          mstore(32, 101)
          revert(63, 1)
        }
      }
      {
        let borrow_amount := mload(m_out)
        let to_repay := borrow_amount
        if lt(amount, to_repay) {
          to_repay := amount
        }
        if to_repay {
          mstore(m_in, /* fn_hash("repayBorrow()") */ 0x4e4d9fea00000000000000000000000000000000000000000000000000000000)
          let m_in_size := 4
          let wei_to_send := to_repay
          if asset_address {
            mstore(m_in, /* fn_hash("repayBorrow(uint256)") */ 0x0e75270200000000000000000000000000000000000000000000000000000000)
            mstore(add(m_in, 4), to_repay)
            m_in_size := 36
            wei_to_send := 0
          }
          let res := call(gas, c_address, wei_to_send, m_in, m_in_size, m_out, 32)
          if iszero(res) {
            mstore(32, 102)
            revert(63, 1)
          }
          switch returndatasize
            case 0 {
              if asset_address {
                mstore(32, 103)
                revert(63, 1)
              }
            }
            case 32 {
              if mload(m_out) {
                mstore(32, 104)
                revert(63, 1)
              }
            }
            default {
              mstore(32, 105)
              revert(63, 1)
            }
          amount := sub(amount, to_repay)
        }
      }
      {
        if amount {
          mstore(m_in, /* fn_hash("mint()") */ 0x1249c58b00000000000000000000000000000000000000000000000000000000)
          let m_in_size := 4
          let wei_to_send := amount
          if asset_address {
            mstore(m_in, /* fn_hash("mint(uint256)") */ 0xa0712d6800000000000000000000000000000000000000000000000000000000)
            mstore(add(m_in, 4), amount)
            m_in_size := 0x24
            wei_to_send := 0
          }
          let res := call(gas, c_address, wei_to_send, m_in, m_in_size, m_out, 32)
          if iszero(res) {
            mstore(32, 106)
            revert(63, 1)
          }
          switch returndatasize
            case 0 {
              if asset_address {
                mstore(32, 107)
                revert(63, 1)
              }
            }
            case 32 {
              if mload(m_out) {
                mstore(32, 108)
                revert(63, 1)
              }
            }
            default {
              mstore(32, 109)
              revert(63, 1)
            }
        }
      }
    }
  }
  
  function withdraw(address asset, uint256 amount, address destination) external  {
    assembly {
      if xor(caller, sload(_owner_slot)) {
        mstore(32, 1)
        revert(63, 1)
      }
    }
    _withdraw(asset, amount, destination);
  }
  
  function _withdraw(address asset, uint256 amount, address destination) internal  {
    
    uint256[2] memory m_in;
    
    uint256[1] memory m_out;
    assembly {
      let c_address := sload(add(_compound_lookup_slot, asset))
      if iszero(c_address) {
        mstore(32, 200)
        revert(63, 1)
      }
      let remaining := amount
      {
        mstore(m_in, /* fn_hash("balanceOf(address)") */ 0x70a0823100000000000000000000000000000000000000000000000000000000)
        mstore(add(m_in, 0x04), address)
        let res := call(gas, c_address, 0, m_in, 0x24, m_out, 0x20)
        if iszero(res) {
          mstore(32, 201)
          revert(63, 1)
        }
      }
      {
        let c_balance := mload(m_out)
        if c_balance {
          {
            mstore(m_in, /* fn_hash("exchangeRateCurrent()") */ 0xbd6d894d00000000000000000000000000000000000000000000000000000000)
            let res := call(gas, c_address, 0, m_in, 0x04, m_out, 0x20)
            if iszero(res) {
              mstore(32, 202)
              revert(63, 1)
            }
          }
          let rate := mload(m_out)
          if iszero(rate) {
            mstore(32, 203)
            revert(63, 1)
          }
          let c_redeem := div(add(sub(rate, 1), mul(remaining, 1000000000000000000)), rate)
          if gt(c_redeem, c_balance) {
            c_redeem := c_balance
          }
          if c_redeem {
            mstore(m_in, /* fn_hash("redeem(uint256)") */ 0xdb006a7500000000000000000000000000000000000000000000000000000000)
            mstore(add(m_in, 4), c_redeem)
            let res := call(gas, c_address, 0, m_in, 0x24, m_out, 0x20)
            if iszero(res) {
              mstore(32, 204)
              revert(63, 1)
            }
            if mload(m_out) {
              mstore(32, 205)
              revert(63, 1)
            }
            let t_redeem := div(mul(c_redeem, rate), 1000000000000000000)
            remaining := sub(remaining, t_redeem)
          }
        }
      }
      {
        if remaining {
          mstore(m_in, /* fn_hash("borrow(uint256)") */ 0xc5ebeaec00000000000000000000000000000000000000000000000000000000)
          mstore(add(m_in, 4), remaining)
          let res := call(gas, c_address, 0, m_in, 0x24, m_out, 0x20)
          if or(iszero(res), mload(m_out)) {
            mstore(32, 204)
            revert(63, 1)
          }
        }
      }
      {
        let m_in_size := 0
        let wei_to_send := amount
        let dest := destination
        if asset {
          mstore(m_in, /* fn_hash("transfer(address,uint256)") */ 0xa9059cbb00000000000000000000000000000000000000000000000000000000)
          mstore(add(m_in, 4), destination)
          mstore(add(m_in, 0x24), amount)
          dest := asset
          m_in_size := 0x44
          wei_to_send := 0
        }
        let res := call(gas, dest, wei_to_send, m_in, m_in_size, m_out, 32)
        if iszero(res) {
          mstore(32, 205)
          revert(63, 1)
        }
        if asset {
          if iszero(mload(m_out)) {
            mstore(32, 206)
            revert(63, 1)
          }
        }
      }
    }
  }
  
  function transferOut(address asset, uint256 amount, address destination) external  {
    
    uint256[3] memory m_in;
    
    uint256[1] memory m_out;
    assembly {
      if xor(caller, sload(_owner_slot)) {
        mstore(32, 1)
        revert(63, 1)
      }
      let m_in_size := 0
      let wei_to_send := amount
      let dest := destination
      if asset {
        mstore(m_in, /* fn_hash("transfer(address,uint256)") */ 0xa9059cbb00000000000000000000000000000000000000000000000000000000)
        mstore(add(m_in, 4), destination)
        mstore(add(m_in, 0x24), amount)
        dest := asset
        m_in_size := 0x44
        wei_to_send := 0
      }
      let res := call(gas, dest, wei_to_send, m_in, m_in_size, m_out, 32)
      if iszero(res) {
        mstore(32, 2)
        revert(63, 1)
      }
      if asset {
        if iszero(mload(m_out)) {
          mstore(32, 3)
          revert(63, 1)
        }
      }
    }
  }
}