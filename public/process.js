
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const SCAddress = "0x73fd9ae1537f285d598ab86d56324ed43e8505e9";
const web3 = new Web3(window.ethereum);
window.ethereum.enable();
var contract = new web3.eth.Contract(abi, SCAddress);
console.log(contract);
var currentAccount = "";
var currentToken = 0;

$(document).ready(function(){
    
    checkMM();

    $("#btnRegister").click(function(){
        $.post("./register",{
            Email:$("#txtEmail").val(),
            Name:$("#txtName").val(),
            Phone:$("#txtPhone").val(),
        }, function(data){
            console.log(data);
        });
    });

    $("#btnConnectMetaMask").click(function(){
        connectMM().then((data) =>{
            console.log(data);
            currentAccount = data[0];
            $("#notice").text("Connect Meta Mask successfully : " + currentAccount);
            getBalance();
        }).catch((err) =>{
            console.log(err);
            $("#notice").text("Connect Meta Mask error!");
        });
    });
    
});

async function connectMM(){
    const accounts = await ethereum.request({method:'eth_requestAccounts' });
    return accounts;
}

async function getBalance(contract, address)
{
    const balance = contract.methods.balanceOf(address).call();          
    console.log("Balance : " + balance);
    return balance;
}

function getBalance(){
    contract.methods.balanceOf(currentAccount).call().then(function (weiBalance){
        let nncBalance = web3.utils.fromWei(weiBalance.toString(), 'ether');
        console.log(nncBalance);   
        $("#token").text("NNC Token : " + nncBalance);     
    });  
}

ethereum.on('accountsChanged', handleAccountsChanged);
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
        var currentAccount = accounts[0];
        $("#notice").text("Connect Meta Mask successfully : " +  currentAccount);     
        contract.methods.balanceOf(currentAccount).call().then(function (weiBalance){
            let nncBalance = web3.utils.fromWei(weiBalance.toString(), 'ether');
            console.log(nncBalance);   
            $("#token").text("NNC Token : " + nncBalance);     
        });  
  }
}

function checkMM(){
    if (typeof window.ethereum !== 'undefined')
    {
        console.log("Metamask is intalled");
    }
    else
    {
        alert("Please install meta mask");
        console.log("Metamask not install");
    }
}