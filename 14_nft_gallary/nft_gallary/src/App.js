import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import web3 from 'web3'
async function connectwallet() { 
  try { 
      if (window.ethereum) { 
        var web3 = new Web3(window.ethereum); 
        await window.ethereum.send('eth_requestAccounts'); 
        var accounts = await web3.eth.getAccounts(); 
        account = accounts[0]; 
        document.getElementById('wallet-address').textContent = account; 
  
        contract = new web3.eth.Contract(ABI, ADDRESS); 
        document.getElementById('mint').onclick = async () => { 
          var _mintAmount = Number(document.querySelector("[name=amount]").value); 
          var mintRate = Number(await contract.methods.cost().call()); 
          var totalAmount = mintRate * _mintAmount; 
          contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
        } 
      }
  } catch (ex) { 
      console.log(ex) 
    } 
  } 


function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <form class='gradient col-lg-5 mt-5' style={{borderRadius: "25px", boxShadow: "1px 1px 15px #FFD700"}}>
            <h4 style={{color: "#FFFFFF"}}>Mint Portal</h4>
            <h5 style={{color: "#FFFFFF"}}>Please connect your wallet</h5>
            <Button onClick={connectwallet} style={{marginBottom:"5px", color: "#FFFFFF"}}>Connect Wallet</Button>
            <div class="card" id='wallet-address' style={{marginTop:"3px", boxShadow:"1px 1px 4px #000000"}}>
              <label style={{color: "#FFFFFF"}} for="floatingInput">Wallet Address</label>
              <input type="number" name="amount" defaultValue="1" min="1" max="5" />
              <label style={{color: "#FFFFFF"}}>Please select the amount of NFTs to mint.</label>
              <Button style={{color: "#FFFFFF"}}>Mint/Buy</Button>
            </div>
            <label style={{color: "#FFFFFF"}}>Price 0.06 ETH each mint.</label>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
