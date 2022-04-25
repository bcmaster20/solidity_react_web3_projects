// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract AssemblyTest {
    uint[] d = [1,2,3];
    uint[3] s = [1,2,3];
    
    function d_1() public view returns (uint r) {
        uint[] memory arr = d;
        assembly {
            r := arr
        }
    }
    
    function d_2() public view returns (uint r) {
        uint[] memory arr = d;
        assembly {
            r := mload(arr)
        }
    }
    
    function s_2() public view returns (uint r) {
        uint[3] memory arr = s;
        
        assembly {
            r := mload(arr)
        }
    }

    function for_loop_assembly(uint n, uint value) public pure returns (uint) {
            
        assembly {
                    
            for { let i := 0 } lt(i, n) { i := add(i, 1) } { 
                value := mul(2, value) 
            }
                
            mstore(0x0, value)
            return(0x0, 32)
                
        }
                
    }    


    
function addition(uint x, uint y) public pure returns (uint) {
    assembly {
        let z := add(keccak256(0x0, 0x20), div(64, 32))
        let result := add(x, y)
        mstore(0x0, result)
        return(0x0, 32)
    }
}

  function scopes() public pure returns (uint) { 
    assembly {
      let x := 3
      {
        let y := x
      }

      let v := 0
      let t := 0

      // Example of a while loop
      for { } lt(v, 0x100) {} {
        t := add(t, mload(v))
      }

      // Example of a for loop
      for { let i := 0 } lt(i, 5) { i := add(i, 1) } {
        t := mul(2, t)
      }
      mstore(0x0, t)
      return(0x0, 32)
    }
  }
    
    uint b=2;
    function f(uint x) public view returns (uint r) {
        assembly {
            // We ignore the storage slot offset, we know it is zero
            // in this special case.
            r := mul(x, sload(b.slot))
        }
    }    
}