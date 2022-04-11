■ Reference!
we recursively called withdrawal each time withdrawing to ether from the bank.

■ Attacker
payable(msg.sender).sendValue(balances[msg.sender]);
balances[msg.sender] = 0;
⇒
■ Attacker
uint accountBalance = balances[msg.sender];
balances[msg.sender] = 0;
payable(msg.sender).sendValue(accountBalance);

⇒
■ ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

・Contract module that helps prevent reentrant calls to a function.
・Inheriting from ReentrancyGuard will make the nonReentrant modifier available, which can be applied to functions to make sure there are no nested (reentrant) calls to them.