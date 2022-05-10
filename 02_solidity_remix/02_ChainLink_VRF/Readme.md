# Chain Link
## 1. Lottery_w_Cainlink_VRF.sol
[link](https://www.youtube.com/watch?v=_aXumgdpnPU&list=PLD_RqipW0-9tzS2HFvem3GAG_at4aoZa3&index=6)


### Chain link 
https://docs.chain.link/docs/get-a-random-number/

```shell
https://vrf.chain.link/rinkeby/2538

● V2方式で更新
2022/04/08
● Subscription_id : 2538
● Add consumer address (smartcontract address)
0xc03615aA3c88473d5AE30Aa3553EF2155AF48997

● 実行
・Run the enter function (three account)
・Run pickWinner
```

### Chain link Source
[Source](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBaseV2.sol)

```shell
VRFConsumerBaseV2.sol
VRFCoordinatorV2Interface.sol
LinkTokenInterface.sol
```

## 2. OracleAggregator.sol
To consume price data, your smart contract should reference AggregatorV3Interface, which defines the external functions implemented by Data Feeds.

```shell
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
/**
* Network: Kovan
* Aggregator: ETH/USD
* Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
*/
priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    (
    /*uint80 roundID*/,
    int price,
    /*uint startedAt*/,
    /*uint timeStamp*/,
    /*uint80 answeredInRound*/)
     = priceFeed.latestRoundData();
```

## 3. ApiConsumer.sol
```shell
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        // request.add("path", "RAW.ETH.USD.VOLUME24HOUR"); // Chainlink nodes prior to 1.0.0 support this format
        request.add("path", "RAW,ETH,USD,VOLUME24HOUR"); // Chainlink nodes 1.0.0 and later support this format
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }

    
```
※ After deployed contract, it will be send link token to this address from any address by manual.

