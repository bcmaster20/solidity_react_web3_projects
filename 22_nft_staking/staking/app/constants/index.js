// binance chain
const stakingAddress = "0xA3E8487ba02b9797FE6907e2C9152a2cFD47860c"
const rewardTokenAddress = "0x320Ea2E4348b0a3734Eb0613D951E291C0AE2D0c"

const stakingAbi = require("./stakingAbi.json")
const rewardTokenAbi = require("./rewardTokenAbi.json")

module.exports = {
    stakingAbi,
    rewardTokenAbi,
    stakingAddress,
    rewardTokenAddress,
}
