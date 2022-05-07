# Web3 & Solidity Simple Sample
## 1. Send ETH payments using React.js/Metamask
[Code](https://codesandbox.io/s/react-eth-metamask-7vuy7) | [Link](https://www.youtube.com/watch?v=QJZUItAsdfg)

## 2. Sign and Verify messages with React.js and MetaMask
[Code](https://codesandbox.io/s/react-eth-metamask-signatures-ibuxj) 

### Sign Message
```shell
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();
```
### Verify Message
```shell
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }
```

